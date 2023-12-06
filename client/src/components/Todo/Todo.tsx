import { ChangeEvent, useState } from 'react';
import { Task } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { addTodos } from '../../redux/store/thunkActions.ts';
import MyButton from '../MyButton/MyButton.tsx';

export default function Todo() {
  const { id } = useAppSelector((store) => store.userSlice);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Task>({
    text: '',
    isCompleted: false,
    curatorId: 0,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const formSubmitHandler = (): void => {
    dispatch(addTodos(formData));
    setFormData({ text: '', isCompleted: false, curatorId: id });
  };
  console.log(formData);
  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <input
          onChange={changeHandler}
          name="text"
          type="text"
          placeholder="введите описание задачи"
          value={formData.text}
        />
      </div>
      <div style={{ marginBottom: '13px' }}>
        <MyButton onClick={formSubmitHandler} type="button">
          Добавить
        </MyButton>
      </div>
    </div>
  );
}
