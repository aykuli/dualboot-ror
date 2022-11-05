import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';

import { Card, CardActions, CardContent, CardHeader, Button, Modal, TextField, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Snackbar from '../Snackbar';
import TaskForm from '../../../forms/TaskForm';
import useStyles from './useStyles';

function AddPopup({ onClose, onCreateCard }) {
  const [task, changeTask] = useState(TaskForm.defaultAttributes());
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
        setMessage({ type: 'error', text: `Task saving failed! ${error?.message || ''}` });
        setIsOpenSnackbar(true);
      }
    });
  };

  const handleChangeTextField = (fieldName) => (event) => changeTask({ ...task, [fieldName]: event.target.value });
  const styles = useStyles();

  // todo add expired_at field, assignee - list of devs

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
            <div className={styles.form}>
              <TextField
                error={has('name', errors)}
                helperText={errors.name}
                onChange={handleChangeTextField('name')}
                value={task.name}
                label="Name"
                required
                margin="dense"
              />
              <TextField
                error={has('description', errors)}
                helperText={errors.description}
                onChange={handleChangeTextField('description')}
                value={task.description}
                label="Description"
                required
                margin="dense"
              />
            </div>
          </CardContent>
          <CardActions className={styles.actions}>
            <Button disabled={isSaving} onClick={handleCreate} variant="contained" size="small" color="primary">
              {isSaving ? 'Saving...' : 'Add'}
            </Button>
          </CardActions>
        </Card>
      </Modal>

      {isOpenSnakbar && <Snackbar isOpen={isOpenSnakbar} {...{ message }} />}
    </>
  );
}

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
};

export default AddPopup;
