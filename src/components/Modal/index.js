import cn from 'classnames';

import s from './Modal.modulr.css';

const Modal = ({ title, children, isOpen }) => {
  return (
    <div
      class={cn(s.root, {
        [s.open]: isOpen,
      })}
    >
      <div class={s.modal}>
        <div class={s.head}>
          {title}
          <span class={s.btnClose}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
