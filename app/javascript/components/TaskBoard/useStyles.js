import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  addButton: {
    position: 'fixed',
    bottom: 50,
    right: 32,
  },
  kanbanWrapper: {
    '& .react-kanban-column': {
      backgroundColor: `rgba(${palette.primary.light}, 0.3)`,
    },
  },
}));

export default useStyles;
