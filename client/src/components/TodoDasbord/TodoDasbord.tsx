import MyButton from "../MyButton/MyButton.tsx";
import Todo from "../Todo/Todo.tsx";
import {useAppDispatch, useAppSelector} from "../../redux/store/hooks.ts";
import {deleteTodo, updateTodoStatus} from "../../redux/store/thunkActions.ts";

export default function TodoDasbord() {
    const { todos } = useAppSelector((store) => store.clientSlice);
    const dispatch = useAppDispatch();

    const handleButtonClick = (id: string | number, isCompleted: boolean) => {
        dispatch(updateTodoStatus({ id, isCompleted: !isCompleted }));
    };

    return (
        <div>
            <h2>All Task</h2>
            <Todo/>
            {todos.map(task => (
                <div key={task.id}>
                    <div>{task.text}</div>
                    {/*<div>{new Date(task.deadline).toLocaleDateString()}</div>*/}
                    <input
                        id={task.id.toString()}
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleButtonClick(task.id, task.isCompleted)}
                    />
                    <MyButton onClick={() => dispatch(deleteTodo(task.id))}>
                       Delete
                    </MyButton>
                </div>
            ))}
        </div>
    );
}
