import React from 'react';

import s from './Button.module.css';

const Button = ({ onClick, disabled = false, children }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button className={s.button} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
