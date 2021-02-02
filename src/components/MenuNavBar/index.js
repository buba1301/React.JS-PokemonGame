import { useState } from 'react';

import Menu from '../Menu';
import NavBar from '../Navbar';

const MenuNavBar = () => {
  const [isActiveMenu, setActiveMenu] = useState(false);

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => setActiveMenu(!prevState));
  };

  return (
    <>
      <Menu isActiveMenu={isActiveMenu} />
      <NavBar
        handleOpenCloseMenu={handleOpenCloseMenu}
        isActiveMenu={isActiveMenu}
      />
    </>
  );
};

export default MenuNavBar;
