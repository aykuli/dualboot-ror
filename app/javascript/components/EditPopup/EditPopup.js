import React, { useEffect, useState } from 'react';
import { isNil } from 'ramda';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Modal,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Close, Delete, Save } from '@material-ui/icons';

import Form from 'components/Form';
import TaskPresenter from 'presenters/TaskPresenter';
import { MODE } from 'constants/board';
import TaskForm from 'forms/TaskForm';

import useTasksActions from 'slices/useTasksActions';
import useUiAction from 'slices/useUiActions';
import useStyles from './useStyles';
import useTasks from 'hooks/store/useTasks';

function EditPopup() {
  const styles = useStyles();

  const { setMode } = useUiAction();
  const { loadTask, updateTask, destroyTask } = useTasksActions();
  const {
    board: { openedTaskId, currentTask },
  } = useTasks();

  const [task, setTask] = useState(null);

  const [isDestroying, setIsDestroying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  useEffect(() => {
    loadTask(openedTaskId);
  }, []);

  const handleCardUpdate = () => {
    setIsSaving(true);
    const attributes = TaskForm.attributesToSubmit(task);
    updateTask(task, attributes).then(() => setIsSaving(false));
  };

  const handleCardDestroy = () => {
    setIsDestroying(true);
    destroyTask(task).then(() => setIsDestroying(false));
  };

  const handleClose = () => setMode(MODE.NONE);

  const isLoading = isNil(task);
  const isDisableActions = isLoading || isSaving || isDestroying;

  return (
    <Modal className={styles.modal} open onClose={handleClose}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          }
          title={isLoading ? 'Your task is loading...' : TaskPresenter.title(task)}
        />
        <CardContent>
          {isLoading ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : (
            <Form onChange={setTask} task={task} onSubmit={handleCardUpdate} />
          )}
        </CardContent>
        <CardActions className={styles.actions}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={styles.btn}
            startIcon={isSaving ? <CircularProgress size={15} /> : <Save />}
            disabled={isDisableActions}
            onClick={handleCardUpdate}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            className={styles.btn}
            startIcon={isDestroying ? <CircularProgress size={15} /> : <Delete />}
            disabled={isDisableActions}
            onClick={handleCardDestroy}
          >
            Destroy
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default EditPopup;
