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
        multiline
        margin="dense"
      />

      <FormControl variant="standard" margin="dense" className={styles.dateFromControl}>
        <InputLabel htmlFor="date">Expired at:</InputLabel>
        <InputBase
          id="date"
          type="date"
          inputProps={{ min: new Date() }}
          className={styles.dateInput}
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
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  errors: {},
};

export default Form;
