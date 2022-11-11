import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 250,
    paddingBottom: 0,
  },
  headerRoot: {
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
  taskInfo: {
    marginTop: 16,
  },
  expiredAt: {
    display: 'flex',
  },
  infoTitle: {
    marginRight: 4,
    fontWeight: 600,
  },
  taskInfoRow: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gridColumnGap: 4,
    marginBottom: 2,
  },
}));

export default useStyles;
