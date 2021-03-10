import React from 'react';

import s from './Button.module.css';

const Button = ({ onClick, disabled = false, children, type }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      type={type}
      className={s.button}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
