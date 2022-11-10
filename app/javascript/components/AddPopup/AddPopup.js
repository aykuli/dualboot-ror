import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

import Snackbar from 'components/Snackbar';
import Form from 'components/Form';
import TaskForm from 'forms/TaskForm';
import { SEVERITY } from 'constants/ui';
import TaskPresenter from 'presenters/TaskPresenter';

import { useTasksActions } from 'slices/TasksSlice';
import useStyles from './useStyles';

function AddPopup({ onClose }) {
  const styles = useStyles();

  const { createTask } = useTasksActions();

  const [task, setTask] = useState(TaskForm.defaultAttributes());
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleCreate = () => {
    setSaving(true);
    const attributes = TaskForm.attributesToSubmit(task);
    createTask(attributes);
  };

  return (
    <>
      <Modal className={styles.modal} open onClose={onClose}>
        <Card className={styles.root}>
          <CardHeader
            action={
              <IconButton onClick={onClose}>
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

      {isOpenSnackbar && <Snackbar isOpen={isOpenSnackbar} type={message.type} text={message.text} />}
    </>
  );
}

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddPopup;
