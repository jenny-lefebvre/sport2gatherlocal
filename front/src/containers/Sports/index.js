import { connect } from 'react-redux';

// on importe le composant de présentation
import Sports from 'src/components/Sports';
import { fetchCategories } from '../../actions/sports';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  sports: state.sports.sportsList,
  categories: state.sports.categoriesList,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  loadCategories: () => {
    dispatch(fetchCategories());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Sports);
