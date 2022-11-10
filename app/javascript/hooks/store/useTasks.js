import { useSelector } from 'react-redux';

import { useTasksActions } from 'slices/TasksSlice';
import { states } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadColumn } = useTasksActions();
  const setBoard = () => Promise.all(states.map(({ key }) => loadColumn(key)));

  return { board, setBoard };
};

export default useTasks;
