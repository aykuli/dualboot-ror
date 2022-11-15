import { useSelector } from 'react-redux';

import { useTasksActions } from 'slices/TasksSlice';
import { COLUMNS } from 'constants/board';

const useTasks = () => {
  const { loadColumn } = useTasksActions();

  const board = useSelector((state) => state.TasksSlice.board);

  const loadBoard = () => Promise.all(COLUMNS.map(({ key }) => loadColumn(key)));

  return { board, loadBoard };
};

export default useTasks;
