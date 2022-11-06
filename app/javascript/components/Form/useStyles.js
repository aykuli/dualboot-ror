import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  dateFromControl: {
    marginTop: 16,
  },
  dateInput: {
    marginTop: 10,
  },
}));

export default useStyles;
