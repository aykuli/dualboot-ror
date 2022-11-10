import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'ramda';
import { TextField, InputLabel, InputBase, FormControl } from '@material-ui/core';

import UserSelect from 'components/UserSelect';
import TaskPresenter from 'presenters/TaskPresenter';
import UserPresenter from 'presenters/UserPresenter';

import useStyles from './useStyles';

function Form({ task, errors, onChange, onSubmit }) {
  const styles = useStyles();

  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });

  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });

  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <TextField
        label="Name"
        value={TaskPresenter.name(task)}
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        margin="dense"
        required
      />
      <TextField
        label="Description"
        value={TaskPresenter.description(task)}
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
          value={TaskPresenter.expiredAt(task)}
          onChange={handleChangeTextField('expiredAt')}
          autoFocus
        />
      </FormControl>

      <FormControl variant="standard" margin="dense">
        <UserSelect
          label="Assignee"
          value={UserPresenter.fullName(task.assignee)}
          onChange={handleChangeSelect('assignee')}
          error={has('assignee', errors)}
          helperText={errors.assignee}
          isSearchable
          isClearable
          isRequired
        />
      </FormControl>
    </form>
  );
}

Form.propTypes = {
  task: TaskPresenter.shape().isRequired,
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
