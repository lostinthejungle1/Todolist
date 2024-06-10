import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/RegisterPage.module.css'

function RegisterPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      errors.email = 'Invalid email format';
    }
    if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await register({ email: credentials.email, password: credentials.password });
        navigate('/');
      } catch (error) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label>
        Email:
        <input
          type="email"
          value={credentials.email}
          onChange={e => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </label>
      <label>
        Password:
        <input
          type="password"
          value={credentials.password}
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={credentials.confirmPassword}
          onChange={e => setCredentials({ ...credentials, confirmPassword: e.target.value })}
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </label>
      {errors.submit && <span>{errors.submit}</span>}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
