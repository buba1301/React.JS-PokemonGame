import cn from 'classnames';

import s from './Modal.module.css';

const Modal = ({ title, children, isOpen, onClickClose }) => {
  const handleCloseModal = () => {
    onClickClose && onClickClose();
  };
  return (
    <div
      class={cn(s.root, {
        [s.open]: isOpen,
      })}
    >
      <div class={s.modal}>
        <div class={s.head}>
          {title}
          <span class={s.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
