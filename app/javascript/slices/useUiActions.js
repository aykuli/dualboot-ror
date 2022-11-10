import { useDispatch } from 'react-redux';

import { changeModalState } from './TasksSlice';

export default () => {
  const dispatch = useDispatch();

  const setMode = (mode) => dispatch(changeModalState(mode));

  return { setMode };
};
