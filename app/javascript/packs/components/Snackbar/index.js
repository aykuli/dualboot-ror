import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MuiSnackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab/';

function Snackbar({ isOpen, text, type }) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={type} onClose={handleClose} sx={{ width: '100%' }} action={action}>
        {text}
      </Alert>
    </MuiSnackbar>
  );
}

Snackbar.defaultProps = {
  isOpen: false,
  text: '',
  type: 'success',
};

Snackbar.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
};

export default Snackbar;
