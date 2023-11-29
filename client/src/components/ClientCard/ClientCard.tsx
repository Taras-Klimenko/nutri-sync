import React, { useState, useEffect } from 'react';
import styles from './ClientCard.module.css';
import HabitRow from './HabitRow';

interface ClientType {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  birthday: number;
  paidTill: number;
  curatorId: number;
}

interface ParameterType {
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  BMI: number;
  clientId: number;
}

interface HabitType {
  id: number;
  title: string;
  isCompleted: boolean;
  clientId: number;
}

async function fetchClientById(id: number) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ClientType = await response.json();
  // const dataParam: ParameterType = await response.json();
  // const dataHabit: HabitType = await response.json();
  // console.log(data)
  return data;
}

const ClientCard = () => {
  const [activeTab, setActiveTab] = useState('data');
  const [client, setClient] = useState<ClientType | null>(null);
  const [parameter, setParameter] = useState<ParameterType | null>(null);
  const [habit, setHabit] = useState<HabitType[] | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchClient() {
      const data = await fetchClientById(1);
      console.log(data);
      setClient(data.client);
      setParameter(data.parameter);
      setHabit(data.habit);
    }
    fetchClient();
  }, []);
  if (client === null) {
    return 'Загрузка';
  }
  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'data' ? 'active' : ''}
          onClick={() => handleTabChange('data')}
        >
          Данные о клиенте
        </button>
        <button
          className={activeTab === 'parameters' ? 'active' : ''}
          onClick={() => handleTabChange('parameters')}
        >
          Параметры
        </button>
        <button
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => handleTabChange('goals')}
        >
          Цели
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'data' && (
          <div>
            <h2>Данные:</h2>
            <div> Имя клиента: {client.firstName}</div>
            <div> Фамилия клиента:{client.lastName}</div>
            <div> День рождения: {client.birthday}</div>
            <div> Номер телефона: {client.phoneNumber}</div>
            <div> Клиент оплатил до: {client.paidTill}</div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div>
            <h2>Параметры:</h2>
            <div> Вес: {parameter.weight}</div>
            <div> Обхват груди:{parameter.chest}</div>
            <div> Обхват талии: {parameter.waist}</div>
            <div> Обхват бедер: {parameter.hips}</div>
            <div> Индекс массы тела: {parameter.BMI}</div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div>
            <h2>Привычки:</h2>
            <div>
              {habit?.map((hab) => {
                return <HabitRow key={hab.id} hab={hab} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
