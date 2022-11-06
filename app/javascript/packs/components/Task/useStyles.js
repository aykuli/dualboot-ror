import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    paddingBottom: 0,
  },
  content: {
    maxWidth: '100%',
    overflow: 'hidden',
  },
  title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  expiredAt: {
    display: 'flex',
    marginTop: 16,
  },
  expiredAtTitle: {
    marginRight: 4,
    fontWeight: 600,
  },
}));

export default useStyles;
