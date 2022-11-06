import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { propOr } from 'ramda';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { COLUMNS, META_DEFAULT, initialBoard, MODE, STATE, SEVERITY } from '../../../constants';
import TasksRepository from '../../../repositories/TasksRepository';
import TaskForm from '../../../forms/TaskForm';
import ColumnHeader from '../ColumnHeader';
import Snackbar from '../Snackbar';
import AddPopup from '../AddPopup';
import EditPopup from '../EditPopup';
import Task from '../Task';
import useStyles from './useStyles';

// TODO set loader
function TaskBoard() {
  const styles = useStyles();

  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [message, setMessage] = useState(null);
  const [isOpenSnakbar, setIsOpenSnackbar] = useState(false);
  // const [load, setLoad] = useState(null);
  const [mode, setMode] = useState(MODE.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prev) => ({ ...prev, [state]: { cards: items, meta } }));
    });
  };

  const updateBoard = () => {
    setBoard({
      columns: COLUMNS.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr([], 'cards', boardCards[key]),
        meta: propOr(META_DEFAULT, 'meta', boardCards[key]),
      })),
    });
  };

  const loadBoard = () => COLUMNS.forEach(({ key }) => loadColumnInitial(key));

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);

        setMessage({ type: SEVERITY.SUCCESS, text: `Task move to new state` });
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
    updateBoard();
  }, [boardCards]);

  const toggleMode = () => setMode(mode === MODE.ADD ? MODE.NONE : MODE.ADD);

  const createTask = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      setMessage({ type: SEVERITY.SUCCESS, text: 'Task created and saved!' });
      setIsOpenSnackbar(true);

      setBoardCards((prev) => {
        const cards = [task, ...prev[STATE.NEW_TASK].cards];
        const prevMeta = prev[STATE.NEW_TASK].meta;
        const meta = { ...prevMeta, count: prevMeta.count + 1, totalCount: prevMeta.totalCount + 1 };
        return { ...prev, [STATE.NEW_TASK]: { cards, meta } };
      });

      toggleMode();
      loadColumnInitial(STATE.NEW_TASK);
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
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(task.state);
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
            onLoadMore={(options) => loadColumnInitial(options.id, options.currentPage, 10)}
          />
        )}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={toggleMode}>
        <Add />
      </Fab>
      {mode === MODE.ADD && <AddPopup onCreateCard={createTask} onClose={toggleMode} />}
      {mode === MODE.EDIT && (
        <EditPopup
          onLoadCard={loadTask}
          onUpdateCard={updateTask}
          onDestroyCard={destroyTask}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}

      {isOpenSnakbar && message && <Snackbar isOpen={isOpenSnakbar} type={message?.type} text={message?.text} />}
    </>
  );
}

export default TaskBoard;
