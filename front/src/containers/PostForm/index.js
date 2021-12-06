import { connect } from 'react-redux';

import PostForm from 'src/components/PostForm';

import {
  updateFormpostField,
  submitAddPost,
  clearSelectSport,
  clearFilterLocation,
} from 'src/actions/addpost';

const mapStateToProps = (state) => ({
  title: state.addpost.title,
  description: state.addpost.description,
  minPeople: state.addpost.minPeople,
  maxPeople: state.addpost.maxPeople,
  date: state.addpost.date,
  location: state.addpost.location,
  level: state.addpost.level,
  username: state.auth.username,
  userPicture: state.auth.picture,
  sports: state.sports.sportsList,
  isAdded: state.addpost.isAdded,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateFormpostField(newValue, name));
  },
  handleAddPost: () => {
    dispatch(submitAddPost());
  },
  resetSport: (name) => {
    dispatch(clearSelectSport(name));
  },
  resetLocation: () => {
    dispatch(clearFilterLocation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
