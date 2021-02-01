import cn from 'classnames';

import s from './Menu.module.css';

const Menu = ({ isActiveMenu }) => {
  const classNamesMenuContainer = cn(
    s.menuContainer,
    isActiveMenu ? s.active : ''
  );

  return (
    <div className={classNamesMenuContainer}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          <li>
            <a href='#welcome'>HOME</a>
          </li>
          <li>
            <a href='#game'>GAME</a>
          </li>
          <li>
            <a href='#about'>ABOUT</a>
          </li>
          <li>
            <a href='#contact'>CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
