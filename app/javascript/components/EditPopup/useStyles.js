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
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btn: {
    padding: '16px 12px',
    fontSize: 14,
    lineHeight: '14px',
    height: 14,
  },
}));

export default useStyles;
