import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { grey } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

export default function BurgerNav({ deconnect, isLogged }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deconnect();
    localStorage.clear();
  };

  return (
    <div className="burger-nav">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <div className="menu-icon">
          <MenuRoundedIcon style={{ fontSize: 30, color: grey[100] }} />
        </div>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/">Accueil</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/sports">Sports</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/posts">Annonces</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/about">A propos</NavLink>
        </MenuItem>
        {isLogged && (
          <MenuItem onClick={handleClose}>
            <div
              onClick={() => {
                handleLogout();
              }}
            >
              Déconnexion
            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
