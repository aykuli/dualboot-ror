import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

import TasksRepository from 'repositories/TasksRepository';
import { initialColumns, MODE, STATE } from 'constants/board';
import { SEVERITY } from 'constants/ui';

const initialState = {
  board: {
    columns: initialColumns,
    snackbar: {
      isOpen: false,
      text: '',
      type: SEVERITY.ERROR,
    },
    modalState: MODE.NONE,
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
    showSnackbar(state, payload) {
      state.board.snackbar = { isOpen: true, ...payload };
    },
    changeModalState(state, payload) {
      state.board.modalState = payload;
    },
  },
});

const { loadColumnSuccess, showSnackbar, changeModalState } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const createTask = (attributes) =>
    TasksRepository.create(attributes).then(() => {
      loadColumn(STATE.NEW_TASK);
      dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task created and saved!' }));

      changeModalState(MODE.NONE);
    });

  return { loadColumn, loadTask, createTask };
};
