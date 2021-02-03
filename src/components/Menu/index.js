import cn from 'classnames';
import { Link } from 'react-router-dom';
import routes from '../../routes';

import s from './Menu.module.css';

const Menu = ({ isActiveMenu, handleOpenCloseMenu }) => {
  const classNamesMenuContainer = cn(s.menuContainer, {
    [s.active]: isActiveMenu === true,
    [s.deactive]: isActiveMenu === false,
  });

  const handleClick = () => {
    handleOpenCloseMenu && handleOpenCloseMenu();
  };

  return (
    <div className={classNamesMenuContainer}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {routes.map(({ name, to }) => {
            return (
              <li key={name} onClick={handleClick}>
                <Link to={to}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
