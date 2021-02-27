import { useState } from 'react';

import Menu from '../Menu';
import Modal from '../Modal';
import NavBar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => {
      return !prevState;
    });
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
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
        onClickLogin={handleClickLogin}
      />
      <Modal
        title='Login for game...'
        isOpen={isOpenModal}
        onClickClose={handleClickLogin}
      >
        It is logi from
      </Modal>
    </>
  );
};

export default MenuHeader;
