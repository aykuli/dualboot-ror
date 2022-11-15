import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { changeColumn } from '@asseinfo/react-kanban';

import { initialColumns, MODE } from 'constants/board';
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
    errors: null,
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
    setFormErrors(state, { payload }) {
      state.ui.errors = payload;
    },
  },
});

export const { loadColumnSuccess, showSnackbar, changeModalState, setEditingTaskId, setCurrentTask, setFormErrors } =
  tasksSlice.actions;

export default tasksSlice.reducer;
