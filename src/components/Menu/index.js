import cn from 'classnames';
import routes from '../../routes';

import s from './Menu.module.css';

const Menu = ({ isActiveMenu }) => {
  const classNamesMenuContainer = cn(s.menuContainer, {
    [s.active]: isActiveMenu === true,
    [s.deactive]: isActiveMenu === false,
  });

  return (
    <div className={classNamesMenuContainer}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {routes.map(({ name, href }) => {
            return (
              <li>
                <a href={href}>{name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
