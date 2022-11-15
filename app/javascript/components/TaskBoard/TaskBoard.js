import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import ColumnHeader from 'components/ColumnHeader';
import Snackbar from 'components/Snackbar';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import Task from 'components/Task';
import TaskForm from 'forms/TaskForm';
import { MODE, STATE } from 'constants/board';
import { SEVERITY } from 'constants/ui';
import { useTasksActions } from 'slices/TasksSlice';
import useTasks from 'hooks/store/useTasks';

import useStyles from './useStyles';

function TaskBoard() {
  const styles = useStyles();

  const { board, loadBoard } = useTasks();
  const { loadColumn, createTask, loadTask, updateTask, destroyTask } = useTasksActions();

  const [mode, setMode] = useState(MODE.NONE);
  const [message, setMessage] = useState(null);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return updateTask(task, { task: { stateEvent: transition.event } })
      .then(() => {
        loadColumn(destination.toColumnId);
        loadColumn(source.fromColumnId);

        setMessage({
          type: SEVERITY.SUCCESS,
          text: `Task "${task.name}" moved from state ${source.fromColumnId} to ${destination.toColumnId}`,
        });
        setIsOpenSnackbar(true);
      })
      .catch((error) => {
        setMessage({ type: SEVERITY.ERROR, text: `Move failed! ${error?.message || ''}` });
        setIsOpenSnackbar(true);
      });
  };

  useEffect(() => {
    loadBoard();
  }, []);

  const handleClose = () => {
    setMode(MODE.NONE);
    setOpenedTaskId(null);
  };

  const handleUpdateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return updateTask(task, attributes).then(() => {
      loadColumn(task.state);
      handleClose();
    });
  };

  const handleDestroyTask = (task) => destroyTask(task).then(() => handleClose());

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODE.EDIT);
  };

  const handleCreateTask = (params) => {
    createTask(params).then(() => {
      loadColumn(STATE.NEW_TASK);

      setMessage({ type: SEVERITY.SUCCESS, text: 'Task created and saved!' });
      setIsOpenSnackbar(true);

      setMode(MODE.NONE);
    });
  };

  const loadColumnMore = (options) => loadColumn(options.id, options.currentPage, 10);

  return (
    <>
      <KanbanBoard
        renderCard={(card, index) => <Task key={index} task={card} onClick={handleOpenEditPopup} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={() => setMode(MODE.ADD)}>
        <Add />
      </Fab>

      {mode === MODE.ADD && <AddPopup onCreateCard={handleCreateTask} onClose={() => setMode(MODE.NONE)} />}

      {mode === MODE.EDIT && (
        <EditPopup
          cardId={openedTaskId}
          onClose={handleClose}
          onLoadCard={loadTask}
          onUpdateCard={handleUpdateTask}
          onDestroyCard={handleDestroyTask}
        />
      )}

      {isOpenSnackbar && <Snackbar isOpen={isOpenSnackbar} type={message.type} text={message.text} />}
    </>
  );
}

export default TaskBoard;
