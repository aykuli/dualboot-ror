import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { useTasksActions, useUiAction } from 'slices/TasksSlice';
import useStyles from './useStyles';

function EditPopup({ cardId }) {
  const styles = useStyles();

  const { setMode } = useUiAction();
  const { loadTask, updateTask, destroyTask } = useTasksActions();

  const [task, setTask] = useState(null);

  const [isDestroying, setIsDestroying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    loadTask(cardId).then(setTask);
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

  const isLoading = isNil(task);
  const isDisableActions = isLoading || isSaving || isDestroying;

  const handleClose = () => setMode(MODE.NONE);

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

EditPopup.propTypes = {
  cardId: PropTypes.number.isRequired,
};

export default EditPopup;
