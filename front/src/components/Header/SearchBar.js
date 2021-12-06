import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router';
import SearchBarField from './SearchBarField';

// import './xxxx.scss';

const SearchBar = ({
  sport,
  date,
  place,
  changeField,
  handleSearchbar,
}) => {
  const history = useHistory();
  let sportUrl = sport;
  if (sportUrl === '') {
    sportUrl = '*';
  }

  let placeUrl = place;
  if (placeUrl === '') {
    placeUrl = '*';
  }

  let dateUrl = date;
  if (dateUrl === '') {
    dateUrl = '*';
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('submit test');
    handleSearchbar();
    // <Redirect to={`/posts/${sportToCheck}/${placeToCheck}/${dateToCheck}`} />;
    history.push({
      pathname: `/posts/${sportUrl}/${placeUrl}/${dateUrl}`,
      // pathname: `/posts/${theSport}/${thePlace}/${theDate}`,
    });
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit} name="searchBar-form">
        <div className="form-input">
          <label htmlFor="sport" className="searchBar-label">Sport
            <SearchBarField
              name="sport"
              type="text"
              placeholder="Tennis, running..."
              value={sport}
              manageChange={changeField}
            />
          </label>
        </div>
        <div className="form-input border">
          <label htmlFor="place" className="searchBar-label">Lieu
            <SearchBarField
              name="place"
              type="text"
              placeholder="Où?"
              value={place}
              manageChange={changeField}
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="date" className="searchBar-label">Date
            <SearchBarField
              name="date"
              type="text"
              placeholder="Quand?"
              value={date}
              manageChange={changeField}
              field="inputDate"
            />
            {/* <input
              id="date"
              type="text"
              name="date"
              placeholder="Quand?"
              value={date}
            /> */}
          </label>
        </div>

        <button className="search-button" type="submit">
          <SearchIcon style={{ fontSize: 22, color: grey[100], marginTop: 5 }} />
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  sport: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSearchbar: PropTypes.func.isRequired,

};

export default SearchBar;
