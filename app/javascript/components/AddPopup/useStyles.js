import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
  },
  root: {
    width: 465,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    padding: '16px 12px',
    fontSize: 14,
    lineHeight: '14px',
    height: 14,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
