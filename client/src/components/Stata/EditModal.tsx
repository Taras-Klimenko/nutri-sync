import axios from 'axios';
import MyButton from "../MyButton/MyButton.tsx";
import {useState} from "react";

const EditModal = ({ data, onSave, onDelete, onClose }) => {
    const [editedData, setEditedData] = useState({ ...data });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const calculateBMI = () => {
        const heightInMeters = editedData.height / 100; // переводим рост в метры
        const bmi = (editedData.weight / (heightInMeters * heightInMeters)).toFixed(2);
        return isNaN(bmi) ? '' : bmi;
    };

    const handleSave = async () => {
        const bmi = calculateBMI();
        try {
            const response = await axios.put(
                `http://localhost:3000/api/stata/update/${editedData.id}`,
                { ...editedData, BMI: bmi }
            );
            console.log(response.data);
            onSave({ ...editedData, BMI: bmi });
            onClose();
        } catch (error) {
            console.error('Произошла ошибка при обновлении данных:', error);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/stata/update/${data.id}`);
            console.log(response.data);
            onDelete(data.id);
        } catch (error) {
            console.error('Произошла ошибка при удалении данных:', error);
        }
        setTimeout(() => {
            onClose();
        }, 100);
    };

    return (
        <div style={{ border: '2px solid green', padding: '10px', margin: '10px' }}>
            <h2>Редактируем данные за: {editedData.createdAt.slice(0, 10)}</h2>
            <label>
                Рост см:
                <input type="text" name="height" value={editedData.height} onChange={handleChange} />
            </label>
            <br />
            <label>
                Вес кг:
                <input type="text" name="weight" value={editedData.weight} onChange={handleChange} />
            </label>
            <br />
            <label>
                Объем груди см:
                <input type="text" name="chest" value={editedData.chest} onChange={handleChange} />
            </label>
            <br />
            <label>
                Объем талии см:
                <input type="text" name="waist" value={editedData.waist} onChange={handleChange} />
            </label>
            <br />
            <label>
                Объем бедер см:
                <input type="text" name="hips" value={editedData.hips} onChange={handleChange} />
            </label>
            <br />
            <label>
                ИМТ:
                <input type="text" name="BMI" value={calculateBMI()} readOnly />
            </label>
            <br />

            <MyButton onClick={handleSave}>Сохранить</MyButton>
            <MyButton onClick={handleDelete}>Удалить</MyButton>
            <MyButton onClick={onClose}>Отменить</MyButton>
        </div>
    );
};

export default EditModal;
