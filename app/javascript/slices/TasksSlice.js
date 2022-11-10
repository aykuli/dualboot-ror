import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

import TasksRepository from 'repositories/TasksRepository';
import { initialColumns, MODE, STATE } from 'constants/board';
import { SEVERITY } from 'constants/ui';

const initialState = {
  board: {
    currentTask: null,
    openedTaskId: null,
    columns: initialColumns,
  },
  ui: {
    snackbar: {
      isOpen: false,
      text: '',
      type: SEVERITY.ERROR,
    },
    mode: MODE.NONE,
  },
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
    showSnackbar(state, { payload }) {
      state.ui.snackbar = { isOpen: true, ...payload };
    },
    changeModalState(state, { payload }) {
      state.ui.mode = payload;
    },
    setEditingTaskId(state, { payload }) {
      state.board.openedTaskId = payload;
    },
    setCurrentTask(state, { payload }) {
      state.board.currentTask = payload;
    },
  },
});

export const { loadColumnSuccess, showSnackbar, changeModalState, setEditingTaskId, setCurrentTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
