import { connect } from 'react-redux';

import { updateSearchbarField, submitSearchbar } from 'src/actions/searchbar';

// on importe le composant de présentation
import SearchBar from 'src/components/Header/SearchBar';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  sport: state.searchbar.sport,
  date: state.searchbar.date,
  place: state.searchbar.place,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  changeField: (newValue, name) => {
    // console.log(`newValue=${newValue}, name=${name}`);
    const action = updateSearchbarField(newValue, name);
    dispatch(action);
  },
  handleSearchbar: () => {
    dispatch(submitSearchbar());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
