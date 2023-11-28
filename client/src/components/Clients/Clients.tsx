import React, { useState } from 'react';
import styles from './Clients.module.css';

const Client = () => {
  const [activeTab, setActiveTab] = useState('data');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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

export default Client;
