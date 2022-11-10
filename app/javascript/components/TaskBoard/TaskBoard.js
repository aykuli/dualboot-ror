import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { propOr } from 'ramda';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import ColumnHeader from 'components/ColumnHeader';
import Snackbar from 'components/Snackbar';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import Task from 'components/Task';
import TaskForm from 'forms/TaskForm';
import { COLUMNS, META_DEFAULT, initialBoard, MODE, STATE } from 'constants/board';
import { SEVERITY } from 'constants/ui';
import TasksRepository from 'repositories/TasksRepository';

import useStyles from './useStyles';

function TaskBoard() {
  const styles = useStyles();

  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState({});

  const [mode, setMode] = useState(MODE.NONE);
  const [message, setMessage] = useState(null);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const [isUpdateBoard, setIsUpdateBoard] = useState(false);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const loadColumn = (state, page, perPage) => TasksRepository.index({ q: { stateEq: state }, page, perPage });

  const loadColumnInitial = (state, page = 1, perPage = 10) =>
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prev) => ({ ...prev, [state]: { cards: items, meta } }));
    });

  const updateBoard = () => {
    setBoard({
      columns: COLUMNS.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr([], 'cards', boardCards[key]),
        meta: propOr(META_DEFAULT, 'meta', boardCards[key]),
      })),
    });

    setIsUpdateBoard(false);
  };

  const loadBoard = () =>
    COLUMNS.forEach(({ key }, index) =>
      loadColumnInitial(key).then(() => index === COLUMNS.length - 1 && setIsUpdateBoard(true)),
    );

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { task: { stateEvent: transition.event } })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId).then(() => setIsUpdateBoard(true));

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

  useEffect(() => {
    if (isUpdateBoard) {
      updateBoard();
    }
  }, [isUpdateBoard]);

  const createTask = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(() => {
      loadColumnInitial(STATE.NEW_TASK).then(() => setIsUpdateBoard(true));

      setMessage({ type: SEVERITY.SUCCESS, text: 'Task created and saved!' });
      setIsOpenSnackbar(true);

      setMode(MODE.NONE);
    });
  };

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const handleClose = () => {
    setMode(MODE.NONE);
    setOpenedTaskId(null);
  };

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state).then(() => setIsUpdateBoard(true));

      handleClose();
    });
  };

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(task.state).then(() => setIsUpdateBoard(true));

      handleClose();
    });

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODE.EDIT);
  };

  return (
    <>
      <KanbanBoard
        renderCard={(card, index) => <Task key={index} task={card} onClick={handleOpenEditPopup} />}
        renderColumnHeader={(column) => (
          <ColumnHeader
            column={column}
            onLoadMore={(options) =>
              loadColumnInitial(options.id, options.currentPage, 10).then(() => setIsUpdateBoard(true))
            }
          />
        )}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={() => setMode(MODE.ADD)}>
        <Add />
      </Fab>

      {mode === MODE.ADD && <AddPopup onCreateCard={createTask} onClose={() => setMode(MODE.NONE)} />}

      {mode === MODE.EDIT && (
        <EditPopup
          cardId={openedTaskId}
          onClose={handleClose}
          onLoadCard={loadTask}
          onUpdateCard={updateTask}
          onDestroyCard={destroyTask}
        />
      )}

      {isOpenSnackbar && <Snackbar isOpen={isOpenSnackbar} type={message.type} text={message.text} />}
    </>
  );
}

export default TaskBoard;
