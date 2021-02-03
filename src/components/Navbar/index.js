import cn from 'classnames';
import s from './NavBar.module.css';

const NavBar = ({ handleOpenCloseMenu, isActiveMenu, bgActive = false }) => {
  const handleClick = () => {
    handleOpenCloseMenu && handleOpenCloseMenu();
  };

  const buttonClassNames = cn(s.menuButton, { [s.active]: isActiveMenu });
  const navClassNames = cn({ [s.bgActive]: bgActive });

  return (
    <nav id={s.navbar} className={navClassNames}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={buttonClassNames} onClick={handleClick}>
          <span />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
