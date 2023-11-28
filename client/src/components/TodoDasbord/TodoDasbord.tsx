import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Добавлен импорт Link
import { Task } from "../../types.ts";
import axios from "axios";
import MyButton from "../MyButton/MyButton.tsx";

export default function TodoDasbord() {
    const [tasks, setTasks] = useState<Task[]>([]); // Исправлено имя состояния на setTasks

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Task[]>('http://localhost:3000/clients/task'); // Исправлен тип данных в запросе
                setTasks(response.data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(`Ошибка запроса: ${error.message}`);
                } else {
                    console.error(`Неизвестная ошибка: ${error}`);
                }
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = (taskId, taskTitle, taskStatus) => {
        history.push(`/todos/${taskId}`, { id: taskId, title: taskTitle, status: taskStatus });
    };

    return (
        <div>
            <h2>All Task</h2>
            {tasks.map(task => (
                <div key={task.id}>
                    <div>{task.text}</div>
                    <div>{new Date(task.deadline).toLocaleDateString()}</div>
                    <input
                        id={task.id.toString()}
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleCheckboxChange(task.id, task.isCompleted)}
                    />
                    <MyButton onClick={() => handleButtonClick(task.id, task.text, task.isCompleted)}>
                        more...
                    </MyButton>
                </div>
            ))}
        </div>
    );
}
