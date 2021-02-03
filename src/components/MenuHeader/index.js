import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);
  console.log('isActive', isActiveMenu);

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => !prevState);
  };

  return (
    <>
      <Menu isActiveMenu={isActiveMenu} />
      <NavBar
        handleOpenCloseMenu={handleOpenCloseMenu}
        isActiveMenu={isActiveMenu}
        bgActive={bgActive}
      />
    </>
  );
};

export default MenuHeader;
