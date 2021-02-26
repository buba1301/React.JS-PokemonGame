import cn from 'classnames';
import s from './NavBar.module.css';

import { ReactComponent as LogoSvg } from '../../assets/Logo.svg';
import { ReactComponent as LoginSvg } from '../../assets/login.svg';

const NavBar = ({
  handleOpenCloseMenu,
  isActiveMenu,
  bgActive = false,
  onClickLogin,
}) => {
  const handleClick = () => {
    handleOpenCloseMenu && handleOpenCloseMenu();
  };

  const buttonClassNames = cn(s.menuButton, { [s.active]: isActiveMenu });
  const navClassNames = cn({ [s.bgActive]: bgActive });

  return (
    <nav id={s.navbar} className={navClassNames}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          <LogoSvg />
        </p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            <LoginSvg />
          </div>
          <div className={buttonClassNames} onClick={handleClick}>
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
