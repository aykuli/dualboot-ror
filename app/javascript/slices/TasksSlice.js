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
    TasksRepository.create(attributes)
      .then(() => {
        loadColumn(STATE.NEW_TASK);
        dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task created and saved!' }));

        dispatch(changeModalState(MODE.NONE));
      })
      .catch((error) => {
        dispatch(showSnackbar({ type: SEVERITY.ERROR, text: `Task creating failed! ${error?.message || ''}` }));
      });

  const updateTask = (task, attributes) =>
    TasksRepository.update(task.id, attributes)
      .then(() => {
        loadColumn(task.state);
        dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task was updated!' }));

        dispatch(changeModalState(MODE.NONE));
      })
      .catch((error) => {
        dispatch(showSnackbar({ type: SEVERITY.ERROR, text: `Update Failed! Error: ${error?.message || ''}` }));
      });

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id)
      .then(() => {
        loadColumn(task.state);
        dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task was updated!' }));

        dispatch(changeModalState(MODE.NONE));
      })
      .catch((error) => {
        dispatch(showSnackbar({ type: SEVERITY.ERROR, text: `Update Failed! Error: ${error?.message || ''}` }));
      });

  return { loadColumn, loadTask, createTask, updateTask, destroyTask };
};

export const useUiAction = () => {
  const dispatch = useDispatch();

  const setMode = (mode) => dispatch(changeModalState(mode));

  return { setMode };
};
