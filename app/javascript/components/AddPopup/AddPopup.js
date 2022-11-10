import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Modal,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Close, Save } from '@material-ui/icons';

import { MODE } from 'constants/board';
import Form from 'components/Form';
import TaskForm from 'forms/TaskForm';
import TaskPresenter from 'presenters/TaskPresenter';

import { useTasksActions } from 'slices/useTasksActions';
import { useUiAction } from 'slices/useUiAction';
import useStyles from './useStyles';

function AddPopup() {
  const styles = useStyles();

  const { createTask } = useTasksActions();
  const { setMode } = useUiAction();

  const [task, setTask] = useState(TaskForm.defaultAttributes());
  const [isSaving, setIsSaving] = useState(false);
  const [errors] = useState({});

  const handleCreate = () => {
    setIsSaving(true);
    const attributes = TaskForm.attributesToSubmit(task);
    createTask(attributes).then(() => setIsSaving(false));
  };

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
          title="Add new task"
        />
        <CardContent>
          <Form errors={errors} onChange={setTask} task={task} onSubmit={handleCreate} />
        </CardContent>

        <CardActions className={styles.actions}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            className={styles.btn}
            onClick={handleCreate}
            disabled={isSaving || TaskPresenter.isInvalid(task)}
            startIcon={isSaving ? <CircularProgress size={15} /> : <Save />}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}

export default AddPopup;
