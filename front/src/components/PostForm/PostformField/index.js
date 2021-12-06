/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';

const PostformField = ({
  name,
  labelName,
  value,
  type,
  field,
  manageChange,
  addClass,
  options,
}) => {
  const handleChange = (evt) => {
    manageChange(evt.target.value, name);
  };
  const textareaId = `textarea-${name}`;
  const inputId = `input-${name}`;
  const selectId = `select-${name}`;
  if (field === 'textarea') {
    return (
      <label className="postform-label-column" htmlFor={textareaId}>{labelName}
        <textarea
          onChange={handleChange}
          value={value}
          type={type}
          name={name}
          id={textareaId}
          className={addClass}
        />
      </label>
    );
  }
  if (field === 'input') {
    return (
      <label className="postform-label-column" htmlFor={inputId}>{labelName}
        <input
          onChange={handleChange}
          value={value}
          type={type}
          name={name}
          id={inputId}
        />
      </label>
    );
  }
  if (field === 'select') {
    return (
      <label htmlFor={selectId}>
        <select
          id={selectId}
          value={value}
          onChange={handleChange}
          name={name}
        >
          <option value="">{labelName}</option>
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
  if (field === 'inputDate') {
    return (
      <label htmlFor={inputId}>
        <input
          onChange={handleChange}
          type="date"
          id={inputId}
          name={name}
          value={value}
          min={Date()}
          max="2022-12-31"
        />
      </label>
    );
  }
};

PostformField.propTypes = {
  field: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelName: PropTypes.string,
  /** text used as value for the input */
  value: PropTypes.string.isRequired,
  /** text used as name for the input (and also used as id, with a prefix) */
  name: PropTypes.string.isRequired,
};

// Valeurs par défaut pour les props
PostformField.defaultProps = {
  type: '',
  labelName: '',
};

export default PostformField;
