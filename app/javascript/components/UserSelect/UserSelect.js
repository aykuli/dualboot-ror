import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';

import UsersRepository from 'repositories/UsersRepository';
import UserPresenter from 'presenters/UserPresenter';

import useStyles from './useStyles';

function UserSelect({ label, value, error, isClearable, isDisabled, isRequired, isSearchable, onChange, helperText }) {
  const styles = useStyles();

  const [isFocused, setFocus] = useState(false);

  const handleLoadOptions = (inputValue) =>
    UsersRepository.index({ q: { firstNameOrLastNameCont: inputValue } }).then(({ data }) => data.items);

  return (
    <FormControl margin="dense" disabled={isDisabled} focused={isFocused} error={error} required={isRequired}>
      <InputLabel shrink>{label}</InputLabel>
      <div className={styles.select}>
        <AsyncSelect
          cacheOptions
          loadOptions={handleLoadOptions}
          defaultOptions
          getOptionLabel={(user) => (user ? UserPresenter.fullName(user) : '')}
          getOptionValue={(user) => user.id}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          defaultValue={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

UserSelect.defaultProps = {
  onChange: () => {},
  isSearchable: true,
  isClearable: false,
  isDisabled: false,
  isRequired: false,
  helperText: '',
  error: false,
  value: null,
};

UserSelect.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.shape(),
  error: PropTypes.bool,
};

export default UserSelect;
