import { connect } from 'react-redux';

// on importe le composant de présentation
import RegisterForm from 'src/components/RegisterForm';

import { updateRegisterField, submitRegister, clearSelectSport } from 'src/actions/regist';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  username: state.regist.username,
  email: state.regist.email,
  password: state.regist.password,
  passwordConfirm: state.regist.passwordConfirm,
  bio: state.regist.bio,
  selectAvatar: state.regist.selectAvatar,
  test: state.regist.test,
  firstSportlabel: state.regist.firstSportlabel,
  firstSportLevel: state.regist.firstSportLevel,
  secondSportlabel: state.regist.secondSportlabel,
  secondSportLevel: state.regist.secondSportLevel,
  thirdSportlabel: state.regist.thirdSportlabel,
  thirdSportLevel: state.regist.thirdSportLevel,
  location: state.regist.location,
  sports: state.sports.sportsList,
  isRegistered: state.regist.isRegistered,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateRegisterField(newValue, name));
  },
  handleRegister: () => {
    dispatch(submitRegister());
  },
  resetSport: (name) => {
    dispatch(clearSelectSport(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
