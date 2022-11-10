import { useDispatch } from 'react-redux';

import TasksRepository from 'repositories/TasksRepository';
import { MODE, STATE } from 'constants/board';
import { SEVERITY } from 'constants/ui';

import { loadColumnSuccess, showSnackbar, changeModalState, setEditingTaskId, setCurrentTask } from './TasksSlice';

export default () => {
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
