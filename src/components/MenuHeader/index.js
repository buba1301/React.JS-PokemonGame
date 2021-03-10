import { useState } from 'react';
import { NotificationManager } from 'react-notifications';

import Menu from '../Menu';
import Modal from '../Modal';
import NavBar from '../Navbar';
import LoginForm from '../LoginForm';

import apiRoutes from '../../api';

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isSignIn, setSignIn] = useState(true);

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => {
      return !prevState;
    });
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleChangeFormType = () => {
    setSignIn((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password }) => {
    const url = isSignIn ? apiRoutes.signIn.url : apiRoutes.signUp.url;
    const reqOptions = {
      method: isSignIn ? apiRoutes.signIn.method : apiRoutes.signUp.method,
      body: JSON.stringify({
        email,
        password,
        returnSequreToken: true,
      }),
    };
    const responce = await fetch(url, reqOptions).then((res) => res.json());

    console.log('SIGNIN', responce);
    if (responce.hasOwnProperty('error')) {
      NotificationManager.error(responce.error.message, 'Wrong!');
    } else {
      localStorage.setItem('idToken', responce.idToken);
      NotificationManager.success('Success!');
      setOpenModal((prevState) => !prevState);
    }
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
        title='Auth...'
        isOpen={isOpenModal}
        onClickClose={handleClickLogin}
      >
        <LoginForm
          onSubmit={handleSubmitLoginForm}
          onClick={handleChangeFormType}
          isSignIn={isSignIn}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;
