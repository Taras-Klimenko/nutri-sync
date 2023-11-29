import React, { useState } from 'react';

async function updateHabitById(id: number, isCompleted: boolean) {
  await fetch(`http://localhost:3000/habit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });
}

const HabitRow = ({ hab }) => {
  const [isActive, setIsActive] = useState(hab.isCompleted);

  const handleCheckboxChange = (id) => {
    if (isActive === true) {
      setIsActive(false);
      updateHabitById(id, false);
    } else {
      setIsActive(true);
      updateHabitById(id, true);
    }
  };

  return (
    <div>
      <div>{hab.title}</div>
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => handleCheckboxChange(hab.id)}
      />
    </div>
  );
};

export default HabitRow;
