import {ChangeEvent, useState} from "react";
import { Task } from "../../types.ts";
import {useAppDispatch} from "../../redux/store/hooks.ts";
import {addTodos} from "../../redux/store/thunkActions.ts";
import MyButton from "../MyButton/MyButton.tsx";

export default function Todo() {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState<Task>({ text: '', isCompleted: false });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const formSubmitHandler = (): void => {
        dispatch(addTodos(formData));
        setFormData({ text: "", isCompleted: false });
    };
    return (
        <div>
            <input
                onChange={changeHandler}
                name="text"
                type="text"
                placeholder="Text"
                value={formData.text}
            />
            {/*<input*/}
            {/*    onChange={changeHandler}*/}
            {/*    name="isCompleted"*/}
            {/*    type="checkbox"*/}
            {/*    checked={formData.isCompleted}*/}
            {/*/>*/}
            <MyButton onClick={formSubmitHandler} type="button">
                Submit
            </MyButton>
        </div>
    );
};
