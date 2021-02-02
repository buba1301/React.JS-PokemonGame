import cn from 'classnames';
import s from './NavBar.module.css';

const NavBar = ({ handleOpenCloseMenu, isActiveMenu }) => {
  const handleClick = () => {
    handleOpenCloseMenu && handleOpenCloseMenu();
  };

  const buttonClassNames = cn(s.menuButton, isActiveMenu ? s.active : '');

  return (
    <nav id={s.navbar}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a className={buttonClassNames} onClick={handleClick}>
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
