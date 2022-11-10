import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MuiSnackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab/';

import { SEVERITY, SNACKBAR_HIDE_DURATION } from 'constants/ui';

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
    <MuiSnackbar open={open} autoHideDuration={SNACKBAR_HIDE_DURATION} onClose={handleClose}>
      <Alert severity={type} onClose={handleClose} sx={{ width: '100%' }} action={action}>
        {text}
      </Alert>
    </MuiSnackbar>
  );
}

Snackbar.defaultProps = {
  text: '',
  isOpen: false,
  type: SEVERITY.SUCCESS,
};

Snackbar.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf([SEVERITY.SUCCESS, SEVERITY.ERROR]),
};

export default Snackbar;
