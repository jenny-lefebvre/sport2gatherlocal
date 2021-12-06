/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const RegisterField = ({
  name,
  value,
  manageChange,
  labelName,
  type,
  field,
  addClass,
  options,
}) => {
  const handleChange = (evt) => {
    manageChange(evt.target.value, name);
  };
  const inputId = `field-${name}`;
  const textareaId = `textarea-${name}`;
  const selectId = `select-${name}`;
  if (field === 'input') {
    return (
      <label className="registerform-label-column" htmlFor={inputId}>{labelName}
        <input
          onChange={handleChange}
          value={value}
          id={inputId}
          name={name}
          type={type}
        />
      </label>
    );
  }
  if (field === 'textarea') {
    return (
      <label className="registerform-label-column" htmlFor={textareaId}>{labelName}
        <textarea
          onChange={handleChange}
          value={value}
          id={textareaId}
          name={name}
          type={type}
        />
      </label>
    );
  }
  if (field === 'select') {
    return (
      <label className="registerform-label-column" htmlFor={selectId}>
        <select
          id={selectId}
          value={value}
          onChange={handleChange}
          name={name}
          className={addClass}
        >
          <option>{labelName}</option>
          {options.map((option) => (
            <option
              value={(option.optionValue)}
              key={option.optionLabel}
            >{option.optionLabel}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (field === 'checkbox-image') {
    return (
      <FormControl component="fieldset">
        <RadioGroup className="radio-group" aria-label="avatar" name={name} value={value} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel
              className="radio-button"
              key={option.optionValue}
              value={option.optionValue}
              control={<Radio color="primary" />}
              label={<img alt="avatar" src={option.optionValue} className="avatar-small" />}
              labelPlacement="top"
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
};

RegisterField.propTypes = {
  type: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  /** text used as value for the input */
  value: PropTypes.string.isRequired,
  /** text used as name for the input (and also used as id, with a prefix) */
  name: PropTypes.string.isRequired,
  /** called when onChange event is received by the input, two parameters :
   * - new value
   * - name
   */
  manageChange: PropTypes.func.isRequired,

};

// Valeurs par défaut pour les props
RegisterField.defaultProps = {
  type: '',
};

export default RegisterField;
