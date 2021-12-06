/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({
  label,
  field,
  name,
  value,
  manageChange,
}) => {
  const filterId = `filter-${name}`;
  const handleChange = (evt) => {
    manageChange(evt.target.value, name);
  };
  if (field === 'select') {
    return (
      <label htmlFor={filterId}>
        <select
          name="sports-filter"
          id={filterId}
          value={value}
          onChange={handleChange}
        >
          <option value="">{label}</option>
          {/* mettre le slug du sport en value */}
          <option value="Tennis">Tennis</option>
          <option value="Running">Running</option>
          <option value="Pétanque">Pétanque</option>
        </select>
      </label>
    );
  }
  if (field === 'date') {
    return (
      <label htmlFor={filterId}>
        <input
          onChange={handleChange}
          name="sports-filter"
          id={filterId}
          type="date"
          value={value}
          min={Date()}
          max="2022-12-31"
        />
      </label>
    );
  }
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Filter;
