import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

import TasksRepository from 'repositories/TasksRepository';
import { initialBoard, STATE } from 'constants/board';

const initialState = {
  board: initialBoard,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) =>
    TasksRepository.index({
      q: { stateEq: state, sortEq: 'created_at desc' },
      page,
      perPage,
    }).then(({ data }) => dispatch(loadColumnSuccess({ ...data, columnId: state })));

  const createTask = (attributes) =>
    TasksRepository.create(attributes).then(() => {
      loadColumn(STATE.NEW_TASK);
    });

  const updateTask = (task, attributes) =>
    TasksRepository.update(task.id, attributes).then(() => {
      loadColumn(task.state);
    });

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(task.state);
    });

  const loadTask = (taskId) => TasksRepository.show(taskId).then(({ data: { task } }) => task);

  return { loadColumn, loadTask, createTask, updateTask, destroyTask };
};
