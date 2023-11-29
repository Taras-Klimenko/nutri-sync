import React, { useState } from 'react';

const HabitComponent = () => {
  const [habits, setHabits] = useState({

    clientId: null,
  });

  const handleCheckboxChange = (key) => {
    setHabits((prevHabits) => {
      return {
        ...prevHabits,
        [key]: !prevHabits[key],
      };
    });
  };

  return (
    <div>
      <h3>Привычки</h3>
      {Object.entries(habits).map(([key, value]) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleCheckboxChange(key)}
            />
            {key}
          </label>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;