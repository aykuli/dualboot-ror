import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'ramda';
import Form from '../components/Form';
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
import { Close } from '@material-ui/icons';
import Snackbar from '../Snackbar';
import useStyles from './useStyles';

function EditPopup({ cardId, onClose, onCardDestroy, onLoadCard, onCardUpdate }) {
  const [task, setTask] = useState(null);
  const [isSaving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isOpenSnakbar, setIsOpenSnackbar] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSaving(true);

    onCardUpdate(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      if (error instanceof Error) {
        setMessage({ type: 'error', text: `Update Failed! Error: ${error?.message || ''}` });
        setIsOpenSnackbar(true);
      }
    });
  };

  const handleCardDestroy = () => {
    setSaving(true);

    onCardDestroy(task).catch((error) => {
      setSaving(false);

      setMessage({ type: 'error', text: `Destrucion Failed! Error: ${error?.message || ''}` });
      setIsOpenSnackbar(true);
    });
  };
  const isLoading = isNil(task);

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
            title={isLoading ? 'Your task is loading. Please be patient.' : `Task # ${task.id} [${task.name}]`}
          />
          <CardContent>
            {isLoading ? (
              <div className={styles.loader}>
                <CircularProgress />
              </div>
            ) : (
              <Form errors={errors} onChange={setTask} task={task} />
            )}
          </CardContent>
          <CardActions className={styles.actions}>
            <Button
              disabled={isLoading || isSaving}
              onClick={handleCardUpdate}
              size="small"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
            <Button
              disabled={isLoading || isSaving}
              onClick={handleCardDestroy}
              size="small"
              variant="contained"
              color="secondary"
            >
              Destroy
            </Button>
          </CardActions>
        </Card>
      </Modal>
      {isOpenSnakbar && message && <Snackbar isOpen={isOpenSnakbar} type={message.type} text={message.text} />}
    </>
  );
}

EditPopup.propTypes = {
  cardId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onCardDestroy: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onCardUpdate: PropTypes.func.isRequired,
};

export default EditPopup;
