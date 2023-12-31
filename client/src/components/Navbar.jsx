import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/store/hooks';
import axios from 'axios';
import { logout } from '../redux/store/slice/userSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    axios.get(`${import.meta.env.VITE_URL}auth/logout`, {
      withCredentials: true,
    });
    dispatch(logout());
    localStorage.clear();
    window.location.href = '../landing.html';
  };
  // const { name } = useAppSelector((store) => store.userSlice);

  const localstore = JSON.parse(localStorage.getItem('userState'));
  const name = localstore?.userSlice?.name;
  return (
    <div className="navbar">
      <div className="navLink">{name ? name : 'Гость'}</div>
      {/* <Link className="navLink" to="/login">
        Войти
      </Link> */}
      <Link className="navLink" to="/all-curator">
        Кураторы
      </Link>
      {/* TODO для теста одного клиента (потом удалить)  */}
      {/* <Link className="navLink" to="/clients/1">
        Клиенты
      </Link> */}
      <Link className="navLink" to="/dashboard">
        Главная
      </Link>
      {/* <Link className="navLink" to="/add-clients">
        Добавить клиента
      </Link> */}
      {/* <Link className="navLink" to="/add-clients">
       Новый клиент
      </Link> */}
      <Link className="navLink" to="/knowledge">
        База знаний
      </Link>
      {/* <Link className="navLink" to="/statistics">
        Статистика
      </Link> */}
      {/* <Link className="navLink" to="/statistics">
        Параметры
      </Link> */}
      <Link className="navLink" onClick={() => logoutHandler()}>
        Выйти
      </Link>
    </div>
  );
}
