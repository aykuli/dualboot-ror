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

const { loadColumnSuccess, showSnackbar, changeModalState, setEditingTaskId, setCurrentTask } = tasksSlice.actions;

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

  const updateTaskForDragAndDrop = (sourceColumnId, destinationColumnId) => {
    loadColumn(sourceColumnId);
    loadColumn(destinationColumnId);
  };

  const updateTask = (task, attributes) =>
    TasksRepository.update(task.id, attributes)
      .then(() => {
        loadColumn(task.state);
        dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task was updated!' }));

        dispatch(changeModalState(MODE.NONE));
      })
      .catch((error) => {
        dispatch(showSnackbar({ type: SEVERITY.ERROR, text: `Task updating failed! Error: ${error?.message || ''}` }));
      });

  const destroyTask = (task) =>
    TasksRepository.destroy(task.id)
      .then(() => {
        loadColumn(task.state);
        dispatch(showSnackbar({ type: SEVERITY.SUCCESS, text: 'Task was destroyed!' }));

        dispatch(changeModalState(MODE.NONE));
      })
      .catch((error) => {
        dispatch(
          showSnackbar({ type: SEVERITY.ERROR, text: `Task destroying was failed! Error: ${error?.message || ''}` }),
        );
      });

  const setEditingTask = (id) => {
    dispatch(setEditingTaskId(id));
    dispatch(changeModalState(MODE.EDIT));
  };

  const loadTask = (taskId) => {
    dispatch(changeModalState(MODE.EDIT));

    TasksRepository.show(taskId)
      .then(({ data: { task } }) => dispatch(setCurrentTask(task)))
      .catch((error) => {
        dispatch(
          showSnackbar({
            type: SEVERITY.ERROR,
            text: `Load task failed! Please, try again. Error: ${error?.message || ''}`,
          }),
        );
        dispatch(changeModalState(MODE.NONE));
      });
  };

  return { loadColumn, loadTask, createTask, updateTask, destroyTask, setEditingTask, updateTaskForDragAndDrop };
};

export const useUiAction = () => {
  const dispatch = useDispatch();

  const setMode = (mode) => dispatch(changeModalState(mode));

  return { setMode };
};
