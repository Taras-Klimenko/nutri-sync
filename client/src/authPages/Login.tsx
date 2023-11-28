import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  //   const navigate = useNavigate();
  // const { name } = useAppSelector((store) => store.userReducer);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (name) {
  //     navigate('/main');
  //   }
  // }, [name]);

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
        'http://localhost:3000/auth/login',
        {
          login: inputs.login,
          password: inputs.password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 201) {
        // dispatch({ type: 'SET_USER', payload: response.data });
        // navigate('/main');
        console.log('УСПЕШНЫЙ ВХОД');
      } else if (response.status === 200) {
        console.log('НЕУСПЕШНЫЙ ВХОД');
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
    <div className="container column">
      <h1>Вход</h1>
      <input
        onChange={handleInputChange}
        type="text"
        name="login"
        className="input"
        id="loginInput"
      />
      <label htmlFor="loginInput" className="input__label">
        Login
      </label>
      <br />
      <input
        onChange={handleInputChange}
        type="password"
        name="password"
        id="passwordInput"
        className="input"
      />
      <label htmlFor="passwordInput" className="input__label">
        Password
      </label>
      <br />
      <button onClick={loginHandler}>Войти</button>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
}
