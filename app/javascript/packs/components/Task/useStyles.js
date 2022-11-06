import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
  },
  content: {
    maxWidth: '100%',
    overflow: 'hidden',
  },
  title: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

export default useStyles;
