import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    width: '100%',
  },
  paginationWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
