import React, { useState } from 'react';
import styles from './HabitRow.module.css';


async function updateHabitById(id: number, isCompleted: boolean) {
  await fetch(`http://localhost:3000/habit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });
}


async function deleteHabitById(id: number) {
  await fetch(`http://localhost:3000/habit/${id}`, {
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
  deleteHabitById(id)
  setHabit(prev => {
    console.log(prev)
     const filterPrevHabit = prev.filter(item => item.id !== id)
    console.log(filterPrevHabit)
    return filterPrevHabit
 })
}

  

  return (
    <div>
    <div>{hab.title}</div>
    
    <input
      type="checkbox"
      checked={isActive}
      onChange={() => handleCheckboxChange(hab.id)}
    />
   <button onClick={() => handleDelete(hab.id)}>Удалить</button>
  </div>
  );
};

export default HabitRow;
