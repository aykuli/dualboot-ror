import { useDispatch } from 'react-redux';

import { changeModalState, setFormErrors } from './TasksSlice';

export default () => {
  const dispatch = useDispatch();

  const setMode = (mode) => dispatch(changeModalState(mode));
  const clearErrors = () => dispatch(setFormErrors(null));

  return { setMode, clearErrors };
};
