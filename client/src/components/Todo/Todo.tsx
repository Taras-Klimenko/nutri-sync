import { ChangeEvent, useState } from 'react';
import { Task } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { addTodos } from '../../redux/store/thunkActions.ts';
import MyButton from '../MyButton/MyButton.tsx';
import './Todo.css';

export default function Todo() {
    const { id } = useAppSelector((store) => store.userSlice);

    const dispatch = useAppDispatch();
    const [input, setInput] = useState('');

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const formSubmitHandler = (): void => {
        dispatch(addTodos({ curatorId: id, text: input, isCompleted: false }));
    setInput('')
    };

    return (
        <div className="todoContainer">
            <div className="inputContainer">
                <input
                    onChange={changeHandler}
                    name="text"
                    type="text"
                    className="todoInput"
                    placeholder="Text"
                    value={input}
                />
            </div>
            <div>
                < MyButton onClick={formSubmitHandler} type ="button" >
                    Добавить
                </MyButton>
            </div>
        </div>
    );
}
