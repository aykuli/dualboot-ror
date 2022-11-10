import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    width: '100%',
  },
  paginationWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
