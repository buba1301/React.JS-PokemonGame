import { useState } from 'react';
import { NotificationManager } from 'react-notifications';

import Menu from '../Menu';
import Modal from '../Modal';
import NavBar from '../Navbar';
import LoginForm from '../LoginForm';

import apiRoutes from '../../api';

const logiSignUpUser = async ({ email, password, type }) => {
  const url = apiRoutes[type].url;

  const reqOptions = {
    method: apiRoutes[type].method,
    body: JSON.stringify({
      email,
      password,
      returnSequreToken: true,
    }),
  };

  return await fetch(url, reqOptions).then((res) => res.json());
};

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

  const handleSubmitLoginForm = async (props) => {
    const response = await logiSignUpUser(props);
    console.log('resp', response);

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      localStorage.setItem('idToken', response.idToken);
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
          isResetForm={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
        />
      </Modal>
    </>
  );
};

export default MenuHeader;
