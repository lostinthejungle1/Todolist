import React, { useState, useContext } from 'react';
import {message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/LoginPage.module.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await login(credentials);  
    }catch(e){
      message.warning("Wrong email or password, login failed", 3);
    }
    message.success('login successfully');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <label>
        Email:
        <input
          type="email"
          value={credentials.email}
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
