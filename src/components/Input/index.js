import s from './input.module.css';

const Input = ({ name, label, type = 'text', value, onChange }) => {
  return (
    <div className={s.root}>
      <input
        type={type}
        className={s.input}
        value={value}
        required
        onChange={({ target }) => onChange(target.value)}
      />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>{label}</label>
    </div>
  );
};

export default Input;
