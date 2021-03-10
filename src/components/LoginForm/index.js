import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

import s from './LoginForm.module.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setSignIn] = useState(true);

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

  const handleChangeFormType = () => {
    setSignIn((prevState) => !prevState);
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
        <a
          href='#href'
          className={s.changeFormButton}
          onClick={handleChangeFormType}
        >
          {isSignIn ? 'Registration?' : 'Login?'}
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
