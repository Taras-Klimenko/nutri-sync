import React, { useState } from 'react';
import ClientCard from '../ClientCard/ClientCard'


interface HabitValuesForm {
  title: string;
  isCompleted: boolean;
  clientId: number; 
}



export default function HabitForm(props): JSX.Element {
  const { setHabit, id } = props;
  console.log(id, 'IIIIIIII')
  const [habitValues, setHabitValues] = useState<HabitValuesForm>({
    title: '',  
    isCompleted: false,
    clientId: Number(id),
  });
 


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHabitValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
     fetch(`http://localhost:3000/habit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(habitValues),
      
    }).then((data)=>{
    return data.json()
    }).then((data)=>{
      console.log(data) 
      setHabit((prev) => [...prev, data])
    })

   
    setHabitValues({ title: '',  isCompleted: false, clientId: Number(id)})
  };

  return (
  
    <form  onSubmit={submitHandler}>
      <input
        onChange={changeHandler}
        type="text"
        name="title"
        value={habitValues.title}
        placeholder="text"
        required
      />
      <button type='submit'>Add Habit</button>
  
    </form>
  );
}