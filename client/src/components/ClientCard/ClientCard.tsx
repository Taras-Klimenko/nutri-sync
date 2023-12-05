import React, { useState, useEffect } from 'react';
import './ClientCard.css';
import HabitRow from './HabitRow';
import AddHabit from './AddHabit';
import { useParams } from 'react-router-dom';

interface ClientType {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  birthday: number;
  paidTill: number;
  curatorId: number;
}

interface ParameterType {
  height: number;
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
  const response = await fetch(
    `https://nutrition-o5ja.onrender.com/api/clients/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data: ClientType = await response.json();
  return data;
}

const ClientCard = (props) => {
  const [activeTab, setActiveTab] = useState('data');
  const [client, setClient] = useState<ClientType | null>(null);
  const [parameter, setParameter] = useState<ParameterType | null>(null);
  const [habit, setHabit] = useState<HabitType[] | null>(null);

 const { id } = useParams();
  console.log(id)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function fetchClient() {
      const data = await fetchClientById(id);
      console.log(data);
      setClient(data.client);
      setParameter(data.parameter);
      setHabit(data.habit);
    }
    fetchClient();
  }, [id]);

  
  if (client === null) {
    return 'Загрузка';
  }

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = parsedDate.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }


  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'data' ? 'active' : ''}
          onClick={() => handleTabChange('data')}
        >
          О клиенте
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
          <div className='data-container'>
            <div className='data-text'>
            <h2>Данные:</h2>
            <div> Имя клиента: {client?.firstName}</div>
            <div> Фамилия клиента:{client?.lastName}</div>
            <div> День рождения: {formatDate(client?.birthday)}</div>
            <div> Номер телефона: {client?.phoneNumber}</div>
            <div> Клиент оплатил до: {formatDate(client?.paidTill)}</div>
            <div> Рост, в см: {parameter?.height}</div>
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
           <div className='data-container'>
            <h2>Параметры:</h2>
            <div> Рост: {parameter?.height}</div>
            <div> Вес: {parameter.weight}</div>
            <div> Обхват груди:{parameter.chest}</div>
            <div> Обхват талии: {parameter.waist}</div>
            <div> Обхват бедер: {parameter.hips}</div>
            <div> Индекс массы тела: {parameter.BMI}</div>
          </div>
        )}

        {activeTab === 'goals' && (
             <div className='data-container'>
            <h2>Привычки:</h2>
            
            <div className='habit-cont' style={{ display: 'flex' }}>
              <div className="habit-title">
              <AddHabit id={id} setHabit={setHabit} />
                {habit?.map((hab) => {
                  return <HabitRow key={hab.id} hab={hab} setHabit={setHabit}/>;
                })}
              </div>
              <div>
              
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
