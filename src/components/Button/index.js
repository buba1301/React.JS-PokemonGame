import React from 'react';

import s from './Button.module.css';

const Button = ({ onClick, children }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button className={s.button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
