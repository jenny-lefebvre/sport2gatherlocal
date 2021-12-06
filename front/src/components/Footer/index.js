import React from 'react';

import SocialMedia from 'src/components/Footer/SocialMedia';
import { NavLink } from 'react-router-dom';

import './footer.scss';

const Footer = () => (
  <footer>
    <SocialMedia />
    <h1 className="footer-title">Sport2Gather</h1>
    <div className="copyright">Copyright &copy; 2021 Sport2Gather</div>
    <nav className="footer-nav">
      <NavLink
        to="/legal"
      >
        Mentions Légales
      </NavLink>
    </nav>
  </footer>
);

export default Footer;
