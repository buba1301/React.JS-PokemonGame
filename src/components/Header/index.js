import { useHistory } from 'react-router-dom';
import Button from '../Button';

import s from './Header.module.css';

const Header = ({ title, desc, onClickButton }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/game');
  };

  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.silhouette}></div>
      <div className={s.moon}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{desc}</p>
        <Button onClick={handleClick}>Start Game</Button>
      </div>
    </header>
  );
};

export default Header;
