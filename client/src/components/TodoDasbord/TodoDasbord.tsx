import MyButton from '../MyButton/MyButton.tsx';
import Todo from '../Todo/Todo.tsx';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import {
  deleteTodo,
  updateTodoStatus,
} from '../../redux/store/thunkActions.ts';

export default function TodoDasbord() {
  const { todos } = useAppSelector((store) => store.clientSlice);
  const dispatch = useAppDispatch();

  const handleButtonClick = (id: string | number, isCompleted: boolean) => {
    dispatch(updateTodoStatus({ id, isCompleted: !isCompleted }));
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ marginBottom: '20px' }}>Задачи</h2>
      <Todo />
      {todos.map((task) => (
        <div
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: '#fff',
            
          }}
        >
          <div style={{ flex: '1', marginRight: '10px' }}>{task.text}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id={task.id.toString()}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleButtonClick(task.id, task.isCompleted)}
              style={{ marginRight: '10px' }}
            />
            <MyButton onClick={() => dispatch(deleteTodo(task.id))}>
              Удалить
            </MyButton>
          </div>
        </div>
      ))}
    </div>
  );
}
