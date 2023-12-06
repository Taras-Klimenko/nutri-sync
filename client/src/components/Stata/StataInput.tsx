import { useState } from 'react';
import MyButton from '../MyButton/MyButton.tsx';
import axios from 'axios';

const StataInput = ({ id, onClose, setData }) => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        chest: '',
        waist: '',
        hips: '',
        BMI: '',
    });
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;

        if (name === 'weight' || name === 'height') {
            const BMI = calculateBMI(formData.weight, formData.height);
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                BMI,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const calculateBMI = (weight: string, height: string | number) => {
        const weightNumber = parseFloat(weight);
        const heightNumber = parseFloat(height / 100);
        if (!isNaN(weightNumber) && !isNaN(heightNumber) && heightNumber !== 0) {
            const BMI = (weightNumber / (heightNumber * heightNumber)).toFixed(2);
            console.log(BMI)
            return BMI;
        }
        return '';
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
              `https://nutrition-o5ja.onrender.com/api/stata/${id}`,
              formData
            );
            if (response.status === 200) {
                setData();
                console.log('Данные успешно отправлены на бэкенд');
                onClose();
            } else {
                console.error('Ошибка при отправке данных на бэкенд');
            }
        } catch (error) {
            console.error('Произошла ошибка при отправке данных:', error);
        }
    };

    return (
        <div>
            <label>
                Рост см:
                <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="Введите рост" />
            </label>
            <br />
            <label>
                Вес кг:
                <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="Введите вес" />
            </label>
            <br />
            <label>
                Объем груди см:
                <input type="text" name="chest" value={formData.chest} onChange={handleChange} placeholder="Введите объем груди"/>
            </label>
            <br />
            <label>
                Объем талии см:
                <input type="text" name="waist" value={formData.waist} onChange={handleChange} placeholder="Введите объем талии"/>
            </label>
            <br />
            <label>
                Объем бедер см:
                <input type="text" name="hips" value={formData.hips} onChange={handleChange} placeholder="Введите объем бедер"/>
            </label>
            <br />
            <MyButton onClick={handleSubmit}>Отправить данные</MyButton>
        </div>
    );
};

export default StataInput;

