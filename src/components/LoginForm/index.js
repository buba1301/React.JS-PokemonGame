import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

import s from './LoginForm.module.css';

const LoginForm = ({ onSubmit, onClick, isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit &&
      onSubmit({
        email,
        password,
      });
    setEmail('');
    setPassword('');
  };

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name='email' label='Email' value={email} onChange={setEmail} />
      <Input
        name='password'
        label='Password'
        type='password'
        value={password}
        onChange={setPassword}
      />
      <div className={s.buttonsContainer}>
        <Button type='submit'>{isSignIn ? 'SignIn' : 'SignUp'}</Button>
        <a href='#href' className={s.changeFormButton} onClick={handleClick}>
          {isSignIn ? 'Registration?' : 'Login?'}
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
