import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

const LoginForm = ({ onSubmit }) => {
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
      <Button>Submit</Button>
    </form>
  );
};

export default LoginForm;
