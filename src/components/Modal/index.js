import { useRef } from 'react';
import cn from 'classnames';

import s from './Modal.module.css';

const Modal = ({ title, children, isOpen, onClickClose }) => {
  const modalEL = useRef();

  const handleCloseModal = () => {
    onClickClose && onClickClose();
  };

  const handleClickRoot = (event) => {
    !modalEL.current.contains(event.target) && handleCloseModal();
  };

  return (
    <div
      className={cn(s.root, {
        [s.open]: isOpen,
      })}
      onClick={handleClickRoot}
    >
      <div className={s.modal} ref={modalEL}>
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
