/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import dataCities from 'src/datacities';

export default function SelectLocation({ manageChange, name, manageClear }) {
  const handleChange = (event, value) => {
    if (value != null) {
      manageChange(value.title, name);
    }
    else {
      manageClear();
    }
  };
  return (
    <Autocomplete
      className="filter-city"
      onChange={handleChange}
      id={name}
      options={dataCities}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Ville" variant="outlined" />}
    />
  );
}

SelectLocation.propTypes = {
  manageChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  manageClear: PropTypes.func.isRequired,
};
