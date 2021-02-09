import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <Menu
        isActiveMenu={isActiveMenu}
        handleOpenCloseMenu={handleOpenCloseMenu}
      />
      <NavBar
        handleOpenCloseMenu={handleOpenCloseMenu}
        isActiveMenu={isActiveMenu}
        bgActive={bgActive}
      />
    </>
  );
};

export default MenuHeader;
