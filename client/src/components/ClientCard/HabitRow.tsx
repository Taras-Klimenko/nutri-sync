import React, { useState } from 'react';
import './HabitRow.css';

async function updateHabitById(id: number, isCompleted: boolean) {
  await fetch(`${import.meta.env.VITE_URL}habit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });
}

async function deleteHabitById(id: number) {
  await fetch(`${import.meta.env.VITE_URL}habit/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const HabitRow = ({ hab, setHabit }) => {
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

  const handleDelete = (id) => {
    deleteHabitById(id);
    setHabit((prev) => {
      console.log(prev);
      const filterPrevHabit = prev.filter((item) => item.id !== id);
      console.log(filterPrevHabit);
      return filterPrevHabit;
    });
  };

  return (
    <div className="habit-container">
      <div className='habit-container-new'>
      <input
        className="habit-checkbox"
        type="checkbox"
        checked={isActive}
        onChange={() => handleCheckboxChange(hab.id)}
      />
      <div className="habit-title">{hab.title}</div>
      </div>
      <div className="habit-div">
        <button className="habit-delete" onClick={() => handleDelete(hab.id)}>
         X
        </button>
      </div>
    </div>
  );
};

export default HabitRow;
