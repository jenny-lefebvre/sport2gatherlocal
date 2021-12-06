import React from 'react';

import HomeSingleCarrousel from 'src/components/Home/HomeSingleCarrousel';

// import './xxx.scss';

const HomeCarrousel = () => (
  <div className="home-carrousels">
    <div className="home-carrousel">
      <h3 className="home-carrousel-title">Suggestions d'annonces</h3>
      <HomeSingleCarrousel />
    </div>
    <div className="home-carrousel">
      <h3 className="home-carrousel-title">Suggestions de sports</h3>
      <HomeSingleCarrousel />
    </div>
  </div>
);

export default HomeCarrousel;
