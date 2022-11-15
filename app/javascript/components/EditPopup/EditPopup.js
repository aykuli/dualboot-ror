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

import Snackbar from 'components/Snackbar';
import Form from 'components/Form';
import { SEVERITY } from 'constants/ui';
import TaskPresenter from 'presenters/TaskPresenter';

import useStyles from './useStyles';

function EditPopup({ cardId, onClose, onDestroyCard, onLoadCard, onUpdateCard }) {
  const styles = useStyles();

  const [task, setTask] = useState(null);

  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onLoadCard(cardId).then(setTask);
  }, []);

  const handleCardUpdate = () => {
    setSaving(true);

    onUpdateCard(task).catch((error) => {
      setSaving(false);
      setErrors(error || {});

      setMessage({ type: SEVERITY.ERROR, text: `Update Failed! Error: ${error?.message || ''}` });
      setIsOpenSnackbar(true);
    });
  };

  const handleCardDestroy = () => {
    setIsDestroying(true);

    onDestroyCard(task).catch((error) => {
      setIsDestroying(false);

      setMessage({ type: SEVERITY.ERROR, text: `Destrucion Failed! Error: ${error?.message || ''}` });
      setIsOpenSnackbar(true);
    });
  };

  const isLoading = isNil(task);
  const isDisableActions = isLoading || isSaving || isDestroying;

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
            title={isLoading ? 'Your task is loading...' : TaskPresenter.title(task)}
          />
          <CardContent>
            {isLoading ? (
              <div className={styles.loader}>
                <CircularProgress />
              </div>
            ) : (
              <Form errors={errors} onChange={setTask} task={task} onSubmit={handleCardUpdate} />
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
      {isOpenSnackbar && <Snackbar isOpen={isOpenSnackbar} type={message.type} text={message.text} />}
    </>
  );
}

EditPopup.propTypes = {
  cardId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  onUpdateCard: PropTypes.func.isRequired,
  onDestroyCard: PropTypes.func.isRequired,
};

export default EditPopup;
