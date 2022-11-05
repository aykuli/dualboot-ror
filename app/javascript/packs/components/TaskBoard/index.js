import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { propOr } from 'ramda';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import Task from '../Task';
import AddPopup from '../AddPopup';
import ColumnHeader from '../ColumnHeader';
import Snackbar from '../Snackbar';
import TaskForm from '../../../forms/TaskForm';
import TasksRepository from '../../../repositories/TasksRepository';
import useStyles from './useStyles';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'Dev' },
  { key: 'in_qa', value: 'QA' },
  { key: 'in_code_review', value: 'Code review' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const META_DEFAULT = { count: 0, totalCount: 0, currentPage: 0, perPage: 10 };

const initialBoard = {
  columns: STATES.map(({ key, value }) => ({
    key,
    title: value,
    cards: [],
    meta: META_DEFAULT,
  })),
};

const MODE = {
  ADD: 'add',
  NONE: 'none',
};

// TODO set loader
function TaskBoard() {
  const styles = useStyles();

  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [message, setMessage] = useState(null);
  const [isOpenSnakbar, setIsOpenSnackbar] = useState(false);
  // const [load, setLoad] = useState(null);
  const [mode, setMode] = useState(MODE.NONE);

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const setLoadedColumn = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prev) => ({ ...prev, [state]: { cards: items, meta } }));
    });
  };

  const updateBoard = () => {
    setBoard({
      columns: STATES.map(({ key, value }) => ({
        key,
        title: value,
        cards: propOr([], 'cards', boardCards[key]),
        meta: propOr(META_DEFAULT, 'meta', boardCards[key]),
      })),
    });
  };

  const loadBoard = () => {
    STATES.forEach(({ key }) => {
      setLoadedColumn(key);
    });
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        setLoadedColumn(destination.toColumnId);
        setLoadedColumn(source.fromColumnId);
        setMessage({ type: 'success', text: `Task move to new state` });
        setIsOpenSnackbar(true);
      })
      .catch((error) => {
        setMessage({ type: 'error', text: `Move failed! ${error?.message || ''}` });
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
      setMessage({ type: 'success', text: 'Task created and saved!' });
      setIsOpenSnackbar(true);

      setBoardCards((prev) => ({ ...prev, new_task: [...prev.new_task, task] }));
      toggleMode();
    });
  };

  return (
    <>
      <KanbanBoard
        renderCard={(card, index) => <Task key={index} task={card} />}
        renderColumnHeader={(column) => (
          <ColumnHeader
            column={column}
            onLoadMore={(options) => setLoadedColumn(options.key, options.currentPage, 10)}
          />
        )}
        onCardDragEnd={(params, options, optins2) => {
          console.log('params: ', params);
          console.log('options: ', options);
          console.log('optins2: ', optins2);
          handleCardDragEnd(params, options, optins2);
        }}
        allowAddCard={{ on: 'top' }}
        onNewCardConfirm={(draftCard) => ({
          id: new Date().getTime(),
          ...draftCard,
        })}
        onCardNew={console.log}
        allowAddColumn={{ on: 'right' }}
        onNewColumnConfirm={(draftColumn) => ({
          id: new Date().getTime(),
          title: 'new Card',
          ...draftColumn,
        })}
        onColumnNew={console.log}
        allowRemoveCard
        allowRemoveColumn
        allowRenameColumn
        onCardRemove={console.log}
        onColumnRemove={console.log}
        onColumnRename={console.log}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={toggleMode}>
        <Add />
      </Fab>
      {mode === MODE.ADD && <AddPopup onCreateCard={createTask} onClose={toggleMode} />}

      {isOpenSnakbar && <Snackbar isOpen={isOpenSnakbar} {...{ message }} />}
    </>
  );
}

export default TaskBoard;
