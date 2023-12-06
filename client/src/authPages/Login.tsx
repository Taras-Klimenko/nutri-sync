import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { addUser } from '../redux/store/slice/userSlice';

export default function Login() {
  const navigate = useNavigate();
  const { name } = useAppSelector((store) => store.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name) {
      navigate('/dashboard');
    }
  }, [name]);

  const [inputs, setInputs] = useState({ login: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}auth/login`,
        {
          login: inputs.login,
          password: inputs.password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        dispatch(addUser(response.data));
        navigate('/dashboard');
      } else if (response.status === 200) {
        setError(response.data.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div className="login container column">
      <h1 className="login">Вход</h1>
      <input
        className="login input"
        type="text"
        name="login"
        id="loginInput"
        onChange={handleInputChange}
      />
      <label htmlFor="loginInput" className="login input__label">
        Login
      </label>

      <input
        onChange={handleInputChange}
        type="password"
        name="password"
        id="passwordInput"
        className="login input"
      />
      <label htmlFor="passwordInput" className="login input__label">
        Password
      </label>

      <div className={`login error ${error ? 'visible' : 'invisible'}`}>
        {error}
      </div>

      <button className="login" onClick={loginHandler}>
        Войти
      </button>
    </div>
  );
}
