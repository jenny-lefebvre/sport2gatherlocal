/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';

const SearchBarField = ({
  value,
  type,
  name,
  field,
  placeholder,
  manageChange,
}) => {
  const handleChange = (evt) => {
    manageChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  if (field === 'inputDate') {
    return (
      <input
        onChange={handleChange}
        type="date"
        id={inputId}
        name={name}
        value={value}
        min={Date()}
        max="2022-12-31"
      />
    );
  }

  return (
    <div className="searchbar-field">
      <input
        // React - state
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="input-searchbar"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};

SearchBarField.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string,
  /** type of the input */
  type: PropTypes.string,
  /** text used as name for the input (and also used as id, with a prefix) */
  name: PropTypes.string.isRequired,
  /** text used as placeholder and label */
  placeholder: PropTypes.string.isRequired,
  /** called when onChange event is received by the input, two parameters :
   * - new value
   * - name
   */
  manageChange: PropTypes.func.isRequired,
};

SearchBarField.defaultProps = {
  field: '',
  value: '',
  type: 'text',
};

export default SearchBarField;
