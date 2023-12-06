import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [inputs, setInputs] = useState({
    login: '',
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const regHandler = async () => {
    try {
      const response = await axios.post(
        'https://nutrition-o5ja.onrender.com/auth/reg',
        {
          login: inputs.login,
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        navigate('/dashboard');
      } else if (response.status === 200) {
        setError(response.data.error);
        setErrorVisible(true);
        setTimeout(() => {
          setErrorVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div className="reg container column">
      <h1 className="reg">Регистрация</h1>
      <input
        className="reg input"
        name="login"
        type="text"
        id="loginInput"
        onChange={handleInputChange}
      />
      <label htmlFor="loginInput" className="reg input__label">
        Логин
      </label>
      <input
        name="name"
        type="text"
        id="nameInput"
        onChange={handleInputChange}
        className="reg input"
      />
      <label htmlFor="nameInput" className="reg input__label">
        Имя
      </label>
      <input
        name="email"
        type="text"
        onChange={handleInputChange}
        id="emailInput"
        className="reg input"
      />
      <label htmlFor="emailInput" className="reg input__label">
        Почта
      </label>
      <input
        name="password"
        type="password"
        onChange={handleInputChange}
        id="passwordInput"
        className="reg input"
      />
      <label htmlFor="passwordInput" className="reg input__label">
       Пароль
      </label>
      <br />

      <div className={`reg error ${errorVisible ? 'visible' : 'invisible'}`}>
        {error}
      </div>
      <br />
      <button className="reg" onClick={regHandler}> Регистрация
      </button>
    </div>
  );
}
