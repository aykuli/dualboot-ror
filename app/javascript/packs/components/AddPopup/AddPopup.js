/* eslint-disable no-unused-vars */
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
import { SEVERITY } from '../../../constants';
import Snackbar from '../Snackbar';
import TaskForm from '../../../forms/TaskForm';
import useStyles from './useStyles';
import Form from '../Form';

function AddPopup({ onClose, onCreateCard }) {
  const styles = useStyles();

  const [task, setTask] = useState(TaskForm.defaultAttributes());
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isOpenSnakbar, setIsOpenSnackbar] = useState(false);

  const handleCreate = () => {
    setSaving(true);

    onCreateCard(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        setMessage({ type: SEVERITY.ERROR, text: `Task saving failed! ${error?.message || ''}` });
        setIsOpenSnackbar(true);
      }
    });
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
              disabled={isSaving}
              startIcon={isSaving ? <CircularProgress size={15} /> : <Save />}
            >
              Add
            </Button>
          </CardActions>
        </Card>
      </Modal>

      {isOpenSnakbar && message && <Snackbar isOpen={isOpenSnakbar} type={message.type} text={message.text} />}
    </>
  );
}

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
};

export default AddPopup;
