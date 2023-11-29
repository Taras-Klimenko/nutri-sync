import React, { useEffect, useState } from 'react';
import './Registration.css';
import axios from 'axios';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [inputs, setInputs] = useState({
    login: '',
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  //   const navigate = useNavigate();
  //   const { name } = useAppSelector((store) => store.userReducer);
  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     if (name) {
  //       navigate('/main');
  //     }
  //   }, [name]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const regHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/reg',
        {
          login: inputs.login,
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 201) {
        // dispatch({ type: 'SET_USER', payload: response.data });
        // navigate('/main');
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
    <div className="container column">
      <h1>Регистрация</h1>
      <input
        className="reg input"
        name="login"
        type="text"
        id="loginInput"
        onChange={handleInputChange}
      />
      <label htmlFor="loginInput" className="input__label">
        Login
      </label>
      <br />
      <input
        name="name"
        type="text"
        id="nameInput"
        onChange={handleInputChange}
        className="reg input"
      />
      <label htmlFor="nameInput" className="input__label">
        Name
      </label>
      <br />
      <input
        name="email"
        type="text"
        onChange={handleInputChange}
        id="emailInput"
        className="reg input"
      />
      <label htmlFor="emailInput" className="input__label">
        Email
      </label>
      <br />
      <input
        name="password"
        type="password"
        onChange={handleInputChange}
        id="passwordInput"
        className="reg input"
      />
      <label htmlFor="passwordInput" className="input__label">
        Password
      </label>
      <br />

      <div className={`error ${error ? 'visible' : 'invisible'}`}>{error}</div>
      <br />
      <button className='reg' onClick={regHandler}>Регистрация</button>
    </div>
  );
}
