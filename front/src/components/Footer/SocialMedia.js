import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

// import './xxxx.scss';

const SocialMedia = () => (
  <div className="social-media">
    <div className="footer icon">
      <a href="https://www.instagram.com/?hl=fr"> <InstagramIcon style={{ fontSize: 30 }} /> </a>
    </div>
    <div className="footer icon">
      <a href="https://www.facebook.com/"> <FacebookIcon style={{ fontSize: 30 }} /> </a>
    </div>
    <div className="footer icon">
      <a href="https://twitter.com/home"> <TwitterIcon style={{ fontSize: 30 }} /> </a>
    </div>
    <div className="footer icon">
      <a href="https://www.whatsapp.com/?lang=fr"> <WhatsAppIcon style={{ fontSize: 30 }} /> </a>
    </div>
  </div>
);

export default SocialMedia;
