import React, { useEffect, useState } from 'react';
import { Client } from '../../types.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import MyButton from '../MyButton/MyButton.tsx';
import './EditClient.css'
import {
  deleteClient,
  getCurators,
  updateClient,
} from '../../redux/store/thunkActions.ts';

export default function EditClient() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const clients = useAppSelector((store) => store.clientSlice.clients);
  const { curators } = useAppSelector((store) => store.clientSlice);
  const [formData, setFormData] = useState<Client>();

  useEffect(() => {
    const selectedClient = clients.find((client) => client.id === Number(id));

    if (selectedClient) {
      setFormData(selectedClient);
    } else {
    }
  }, [id, clients]);

  useEffect(() => {
    dispatch(getCurators());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClient = () => {
    dispatch(updateClient(formData));
    navigate('/dashboard');
  };
  const handleDeleteClient = () => {
    dispatch(deleteClient(formData.id));
    navigate('/dashboard');
  };

  return (
    <>
    <div className='editClient'>
      {formData ? (
        <div>
          <label>
            Имя:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="введите имя"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="введите фамилию"
              onChange={handleChange}
            />
          </label>
          <label>
            Дата рождения: {formData.birthday.toString().slice(0, 10)}
            <input
              type="date"
              name="birthday"
              value={formData.birthday.toString()}
              onChange={handleChange}
            />
          </label>
          <label>
            Оплачено до: {formData.paidTill.toString().slice(0, 10)}
            <input
              type="date"
              name="paidTill"
              value={formData.paidTill.toString()}
              onChange={handleChange}
            />
          </label>
          <label>
            Номер телефона:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Phone"
              onChange={handleChange}
            />
          </label>
          <label>
            Куратор:
            <br />
            <select
              name="curatorId"
              value={formData.curatorId}
              onChange={handleChange}
            >
              <option value="">Выберите куратора</option>
              {curators &&
                curators.map((curator) => (
                  <option key={curator.id} value={curator.id}>
                    {curator.name}
                  </option>
                ))}
            </select>
          </label>
          <MyButton onClick={handleUpdateClient}>Сохранить</MyButton>
          <MyButton onClick={handleDeleteClient}>Удалить</MyButton>
          <Link to="/dashboard">
            <MyButton>Отмена</MyButton>
          </Link>
        </div>
      ) : (
        <div>Клиент не найден</div>
      )}
      </div>
    </>
  );
}
