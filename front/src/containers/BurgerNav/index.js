import { connect } from 'react-redux';

import { submitLogout } from 'src/actions/auth';

import BurgerNav from 'src/components/BurgerNav';

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  deconnect: () => {
    dispatch(submitLogout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerNav);
