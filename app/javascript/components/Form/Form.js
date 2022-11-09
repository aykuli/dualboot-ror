import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';
import { TextField, InputLabel, InputBase, FormControl } from '@material-ui/core';

import useStyles from './useStyles';

function Form({ task, errors, onChange, onSubmit }) {
  const styles = useStyles();

  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <TextField
        label="Name"
        value={task.name}
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        margin="dense"
        required
      />
      <TextField
        label="Description"
        value={task.description}
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        multiline
        margin="dense"
        required
      />

      <FormControl variant="standard" margin="dense" className={styles.dateFromControl}>
        <InputLabel htmlFor="date">Expires at:</InputLabel>
        <InputBase
          id="date"
          type="date"
          className={styles.dateInput}
          inputProps={{ min: new Date() }}
          value={task.expiredAt || new Date()}
          onChange={handleChangeTextField('expiredAt')}
          autoFocus
        />
      </FormControl>
    </form>
  );
}

Form.propTypes = {
  task: PropTypes.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
  }),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  errors: {},
};

export default Form;
