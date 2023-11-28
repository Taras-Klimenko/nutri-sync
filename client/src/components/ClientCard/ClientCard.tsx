import React, { useState, useEffect } from 'react';
import styles from './ClientCard.module.css';

interface ClientType {
  firstName: string;
}

async function fetchClientById(id: number) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: ClientType = await response.json();
  // console.log(data)
  return data;
}

const ClientCard = () => {
  const [activeTab, setActiveTab] = useState('data');
  const [client, setClient] = useState<ClientType | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    //Todo change name function
    async function fetchClient() {
      const data = await fetchClientById(2);
      console.log(data);
      setClient(data);
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
            <div>{client.firstName}</div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div>
            <h2>Параметры:</h2>
          </div>
        )}

        {activeTab === 'goals' && (
          <div>
            <h2>Цели:</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCard;
