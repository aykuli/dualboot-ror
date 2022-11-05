import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Snackbar as MuiSnackbar, Alert, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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

Snackbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default Snackbar;
