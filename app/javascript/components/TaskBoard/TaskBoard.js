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
import { MODE } from 'constants/board';
import { SEVERITY } from 'constants/ui';
import TasksRepository from 'repositories/TasksRepository';
import useTasks from 'hooks/store/useTasks';

import { useTasksActions } from 'slices/TasksSlice';
import useStyles from './useStyles';

function TaskBoard() {
  const styles = useStyles();

  const { board, loadBoard } = useTasks();
  const { loadColumn } = useTasksActions();

  const [mode, setMode] = useState(MODE.NONE);
  const [message, setMessage] = useState(null);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { task: { stateEvent: transition.event } })
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

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumn(task.state);

      handleClose();
    });
  };

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(task.state);

      handleClose();
    });

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODE.EDIT);
  };

  return (
    <div className={styles.kanbanWrapper}>
      <KanbanBoard
        renderCard={(card, index) => <Task key={index} task={card} onClick={handleOpenEditPopup} />}
        renderColumnHeader={(column) => (
          <ColumnHeader column={column} onLoadMore={(options) => loadColumn(options.id, options.currentPage, 10)} />
        )}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="secondary" aria-label="add" onClick={() => setMode(MODE.ADD)}>
        <Add />
      </Fab>

      {mode === MODE.ADD && <AddPopup onClose={() => setMode(MODE.NONE)} />}

      {mode === MODE.EDIT && (
        <EditPopup cardId={openedTaskId} onClose={handleClose} onUpdateCard={updateTask} onDestroyCard={destroyTask} />
      )}

      {isOpenSnackbar && <Snackbar isOpen={isOpenSnackbar} type={message.type} text={message.text} />}
    </div>
  );
}

export default TaskBoard;
