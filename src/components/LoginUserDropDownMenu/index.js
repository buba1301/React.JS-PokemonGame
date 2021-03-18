import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../slices';
import s from './styles.module.css';

const LoginUserDropDownMenu = ({ onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick && onClick();
  };

  const handleLogOut = () => {
    onClick && onClick();
    localStorage.removeItem('idToken');
    dispatch(actions.removeUser());
  };

  return (
    <div className={s.root}>
      <Link to='/user' onClick={handleClick}>
        UserInfo
      </Link>

      <Link to='/' onClick={handleLogOut}>
        LogOut
      </Link>
    </div>
  );
};

export default LoginUserDropDownMenu;
