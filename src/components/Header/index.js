import s from './Header.module.css';

const Header = ({ title, desc, onClickButton }) => {
  const handleClick = () => {
    onClickButton && onClickButton('game');
  };

  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{desc}</p>
        <button onClick={handleClick}>Start Game</button>
      </div>
    </header>
  );
};

export default Header;
