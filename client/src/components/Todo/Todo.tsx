import { ChangeEvent, useState } from 'react';
import { Task } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { addTodos } from '../../redux/store/thunkActions.ts';
import MyButton from '../MyButton/MyButton.tsx';

export default function Todo() {
  const { id } = useAppSelector((store) => store.userSlice);

  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const formSubmitHandler = (): void => {
    dispatch(addTodos({ curatorId: id, text: input, isCompleted: false }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <input
          onChange={changeHandler}
          name="text"
          type="text"
          placeholder="Text"
          value={input}
        />
      </div>
      <div style={{ marginBottom: '13px' }}>
        <MyButton onClick={formSubmitHandler} type="button">
          Submit
        </MyButton>
      </div>
    </div>
  );
}
