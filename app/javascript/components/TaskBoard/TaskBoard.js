import React, { useEffect } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { MODE } from 'constants/board';
import ColumnHeader from 'components/ColumnHeader';
import Snackbar from 'components/Snackbar';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import Task from 'components/Task';

import { useTasksActions } from 'slices/useTasksActions';
import { useUiAction } from 'slices/useUiAction';
import useTasks from 'hooks/store/useTasks';
import useStyles from './useStyles';

function TaskBoard() {
  const styles = useStyles();

  const { setMode } = useUiAction();
  const { board, ui, loadBoard } = useTasks();
  const { loadColumn, updateTask, updateTaskForDragAndDrop } = useTasksActions();

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return updateTask(task, { task: { stateEvent: transition.event } }).then(() =>
      updateTaskForDragAndDrop(source.fromColumnId, destination.toColumnId),
    );
  };

  useEffect(() => {
    loadBoard();
  }, []);

  return (
    <div className={styles.kanbanWrapper}>
      <KanbanBoard
        renderCard={(card, index) => <Task key={index} task={card} />}
        renderColumnHeader={(column) => (
          <ColumnHeader column={column} onLoadMore={(options) => loadColumn(options.id, options.currentPage, 10)} />
        )}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>

      <Fab className={styles.addButton} color="secondary" aria-label="add" onClick={() => setMode(MODE.ADD)}>
        <Add />
      </Fab>

      {ui.mode === MODE.ADD && <AddPopup />}

      {ui.mode === MODE.EDIT && <EditPopup />}

      {ui.snackbar.isOpen && <Snackbar isOpen={ui.snackbar.isOpen} type={ui.snackbar.type} text={ui.snackbar.text} />}
    </div>
  );
}

export default TaskBoard;
