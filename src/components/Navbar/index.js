import { useSelector } from 'react-redux';
import cn from 'classnames';

import { selectors } from '../../slices';
import s from './NavBar.module.css';

import { ReactComponent as LogoSvg } from '../../assets/Logo.svg';
import { ReactComponent as LoginSvg } from '../../assets/login.svg';
import { ReactComponent as UserSvg } from '../../assets/user.svg';

const NavBar = ({
  handleOpenCloseMenu,
  isActiveMenu,
  bgActive = false,
  onClickLogin,
}) => {
  const isLoading = useSelector(selectors.selectUserFetch);
  const localId = useSelector(selectors.selectUserLocalId);

  const handleClick = () => {
    handleOpenCloseMenu && handleOpenCloseMenu();
  };

  const buttonClassNames = cn(s.menuButton, { [s.active]: isActiveMenu });
  const navClassNames = cn({ [s.bgActive]: bgActive });

  return (
    <nav id={s.navbar} className={navClassNames}>
      <div className={s.navWrapper}>
        <div className={s.brand}>
          <LogoSvg />
        </div>
        <div className={s.loginAndMenu}>
          {!isLoading && !localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSvg />
            </div>
          )}
          {!isLoading && localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <UserSvg />
            </div>
          )}
          <div className={buttonClassNames} onClick={handleClick}>
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
