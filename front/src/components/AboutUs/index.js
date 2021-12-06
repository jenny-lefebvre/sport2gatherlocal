/* eslint-disable max-len */
import React from 'react';

import alexandre from './alexandre.png';
import elsa from './elsa.png';
import jenny from './jenny.png';
import margo from './margo.png';

import './aboutUs.scss';

const AboutUs = () => (
  <div className="about-us">
    <div className="about-us-portrait">
      <div className="single-portrait">
        <img className="avatar-logo" alt="avatar membre de l'équipe" src={alexandre} />
        <p className="single-portrait-name">Alexandre Adam</p>
        <p>Product owner</p>
        <p>Dev back</p>
      </div>
      <div className="single-portrait">
        <img className="avatar-logo" alt="avatar membre de l'équipe" src={elsa} />
        <p className="single-portrait-name">Elsa Beaugrand</p>
        <p>Scrum master</p>
        <p>Dev Front</p>
      </div>
      <div className="single-portrait">
        <img className="avatar-logo" alt="avatar membre de l'équipe" src={jenny} />
        <p className="single-portrait-name">Jenny Lefebvre</p>
        <p>Lead Dev Back</p>
        <p>Git master</p>
      </div>
      <div className="single-portrait">
        <img className="avatar-logo" alt="avatar membre de l'équipe" src={margo} />
        <p className="single-portrait-name">Margo Brenneur</p>
        <p>Lead Dev Front</p>
        <p>Git master</p>
      </div>
    </div>
  </div>
);

export default AboutUs;
