import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

import Menu from '../Menu';
import Modal from '../Modal';
import NavBar from '../Navbar';
import LoginForm from '../LoginForm';

import apiRoutes from '../../api';
import { asyncActions } from '../../slices';

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

const addPokemonsInDatabase = (data, user) => {
  data.forEach(async (item) => {
    await fetch(
      `${apiRoutes.addPlayerWithStartPokemons.url}/${user.localId}/pokemons.json?auth=${user.idToken}`,
      {
        method: apiRoutes.addPlayerWithStartPokemons.method,
        body: JSON.stringify(item),
      }
    );
  });
};

const MenuHeader = ({ bgActive }) => {
  const [isActiveMenu, setActiveMenu] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleOpenCloseMenu = () => {
    setActiveMenu((prevState) => {
      return !prevState;
    });
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleClickUserIcon = () => {
    history.push('/user');
  };

  const handleSubmitLoginForm = async (props) => {
    const user = await logiSignUpUser(props);

    if (props.type === 'signUp') {
      const startUserPokemons = await fetch(
        apiRoutes.getStartPokemons.url
      ).then((res) => res.json());

      addPokemonsInDatabase(startUserPokemons.data, user);
    }

    if (user.hasOwnProperty('error')) {
      NotificationManager.error(user.error.message, 'Wrong!');
    } else {
      localStorage.setItem('idToken', user.idToken);
      NotificationManager.success('Success!');
      dispatch(asyncActions.getUserUpdateAsync());
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
        onClickUserIcon={handleClickUserIcon}
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
