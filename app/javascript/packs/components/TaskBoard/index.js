/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { propOr } from 'ramda';

// es
import Task from '../Task';
import TasksRepository from '../../../repositories/TasksRepository';

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
    id: key,
    title: value,
    cards: [],
    meta: {},
  })),
};

const data = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column',
        },
      ],
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 1,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
  ],
};

function TaskBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEg: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data: { items, meta } }) => {
      setBoardCards((prev) => ({ ...prev, [state]: { cards: items, meta } }));
    });
  };

  const generateBoard = () => {
    setBoard({
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    });
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  return (
    <KanbanBoard
      renderCard={(card, index) => (
        <Fragment key={index}>
          <Task task={card} />
        </Fragment>
      )}
    >
      {board}
    </KanbanBoard>
  );
}

export default TaskBoard;
