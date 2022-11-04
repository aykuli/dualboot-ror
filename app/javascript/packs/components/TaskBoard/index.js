import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { propOr } from 'ramda';

import TasksRepository from '../../../repositories/TasksRepository';
import Task from '../Task';
import ColumnHeader from '../ColumnHeader';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'Dev' },
  { key: 'in_qa', value: 'QA' },
  { key: 'in_code_review', value: 'Code review' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const initialBoard = {
  columns: STATES.map(({ key, value }) => ({
    key,
    title: value,
    cards: [],
    meta: {},
  })),
};
// TODO set loader
function TaskBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);

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
      columns: STATES.map(({ key, value }) => ({
        key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    });
  };

  const loadBoard = () => {
    STATES.forEach(({ key }) => {
      loadColumnInitial(key);
    });
  };

  useEffect(() => {
    loadBoard();
  }, []);

  useEffect(() => {
    updateBoard();
  }, [boardCards]);

  return (
    <KanbanBoard
      renderCard={(card, index) => <Task key={index} task={card} />}
      renderColumnHeader={(column) => (
        <ColumnHeader column={column} onLoadMore={(options) => loadColumn(options.key, options.currentPage, 10)} />
      )}
    >
      {board}
    </KanbanBoard>
  );
}

export default TaskBoard;
