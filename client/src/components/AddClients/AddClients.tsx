import { useState, useEffect } from 'react';
import styles from './AddClients.module.css';
import MyButton from '../MyButton/MyButton';
import { Client } from '../../types.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { addClient, getCurators } from '../../redux/store/thunkActions.ts';

export default function AddClients() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { curators } = useAppSelector((store) => store.clientSlice);

  const [formData, setFormData] = useState<Client>({
    firstName: '',
    lastName: '',
    birthday: '',
    paidTill: '',
    phoneNumber: '',
    curatorId: 0,
  });

  useEffect(() => {
    dispatch(getCurators());
  }, [dispatch]);
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClient = async () => {
    dispatch(addClient(formData));
    navigate(`/dashboard`);
  };

  return (
    <div className={styles.container}>
      <h2>Добавить клиента</h2>
      <label>
        Имя:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Введите имя"
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
          placeholder="Введите фамилию"
          onChange={handleChange}
        />
      </label>
      <label>
        Дата рождения:
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </label>
      <label>
        Оплачено до:
        <input
          type="date"
          name="paidTill"
          value={formData.paidTill}
          onChange={handleChange}
        />
      </label>
      <label>
        Номер телефона:
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Введите номер телефона"
          onChange={handleChange}
        />
      </label>
      <label>
        Куратор:
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
      <MyButton onClick={handleAddClient}>Добавить</MyButton>
      <Link to="/dashboard">
        <MyButton>Отмена</MyButton>
      </Link>
    </div>
  );
}
