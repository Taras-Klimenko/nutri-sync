import MyButton from '../MyButton/MyButton.tsx';
import Todo from '../Todo/Todo.tsx';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { deleteTodo, updateTodoStatus } from '../../redux/store/thunkActions.ts';
import './TodoDasbord.css'; // Убедитесь, что правильно указан путь к файлу стилей

export default function TodoDasbord() {
  const { todos } = useAppSelector((store) => store.clientSlice);
  const dispatch = useAppDispatch();

  const handleButtonClick = (id: string | number, isCompleted: boolean) => {
    dispatch(updateTodoStatus({ id, isCompleted: !isCompleted }));
  };

  return (
      <div className="todoDasbord"> {/* Добавляем класс для контейнера */}
        <h1>Задачи</h1>
        <Todo />
        {todos.map((task) => (
            <div key={task.id} className="todoItem"> {/* Добавляем класс для элемента */}
              <div>{task.text}</div>
              <div className="todoActions">
                <input
                    id={task.id.toString()}
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleButtonClick(task.id, task.isCompleted)}
                    style={{ marginRight: '10px' }}
                />
                <MyButton onClick={() => dispatch(deleteTodo(task.id))}>
                  X
                </MyButton>
              </div>
            </div>
        ))}
      </div>
  );
}
