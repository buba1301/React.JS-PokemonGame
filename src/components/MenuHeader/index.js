import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);
  console.log('isActive', isActiveMenu);

  const handleOpenCloseMenu = () => {
    console.log('MenuHeader', isActiveMenu);

    setActiveMenu((prevState) => {
      console.log('PrevState', prevState);

      return !prevState;
    });
  };

  console.log('MenuHeaderAfter', isActiveMenu);

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
