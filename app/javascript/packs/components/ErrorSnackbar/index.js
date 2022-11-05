import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Snackbar, Alert, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

function ErrorSnackbar({ isOpen, message }) {
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
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }} action={action}>
        {message}
      </Alert>
    </Snackbar>
  );
}

ErrorSnackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorSnackbar;
