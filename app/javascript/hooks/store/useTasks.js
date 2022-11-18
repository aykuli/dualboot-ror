import { useSelector } from 'react-redux';

import { useTasksActions } from 'slices/TasksSlice';
import { COLUMNS } from 'constants/board';

const useTasks = () => {
  const { loadColumn, loadTask, createTask, updateTask, destroyTask } = useTasksActions();

  const board = useSelector((state) => state.TasksSlice.board);

  const loadBoard = () => Promise.all(COLUMNS.map(({ key }) => loadColumn(key)));

  return { board, loadBoard, loadTask, createTask, updateTask, destroyTask };
};

export default useTasks;
