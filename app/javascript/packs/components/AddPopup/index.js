import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';

import { Card, CardActions, CardContent, CardHeader, Button, Modal, TextField, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import ErrorSnackbar from '../ErrorSnackbar';
import TaskForm from '../../../forms/TaskForm';
import useStyles from './useStyles';

function AddPopup({ onClose, onCreateCard }) {
  const [task, changeTask] = useState(TaskForm.defaultAttributes());
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpenError, setIsOpenError] = useState(false);

  const handleCreate = () => {
    setSaving(true);

    onCreateCard(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        setErrorMessage(`Creation Failed! Error: ${error.message}`);
        setIsOpenError(true);
      } else {
        setErrorMessage(`Creation Failed! Error: ${error.message}`);
        setIsOpenError(false);
      }
    });
  };

  const handleChangeTextField = (fieldName) => (event) => changeTask({ ...task, [fieldName]: event.target.value });
  const styles = useStyles();

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
              Add
            </Button>
          </CardActions>
        </Card>
      </Modal>
      <ErrorSnackbar isOpen={isOpenError} message={errorMessage} />
    </>
  );
}

AddPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCreateCard: PropTypes.func.isRequired,
};

export default AddPopup;
