/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectSport({ manageChange, name, manageClear, sports, label }) {
  const handleChange = (event, value) => {
    // console.log(value.name);
    if (value != null) {
      manageChange(value.id, name);
    }
    else {
      manageClear(name);
    }
  };
  return (
    <Autocomplete
      className="select-sport-auto"
      onChange={handleChange}
      id={name}
      options={sports}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}

SelectSport.propTypes = {
  manageChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  manageClear: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};
