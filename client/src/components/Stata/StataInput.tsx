import { useState } from 'react';
import MyButton from '../MyButton/MyButton.tsx';
import axios from 'axios';
import './StataInput.css';
import EditButton from "../EditButton/EditButton.tsx";

const StataInput = ({ id, onClose, SetData }) => {
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        chest: '',
        waist: '',
        hips: '',
        BMI: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'weight' || name === 'height') {
            const updatedWeight = name === 'weight' ? value : formData.weight;
            const updatedHeight = name === 'height' ? value : formData.height;
            const updatedBMI = updatedWeight / ((updatedHeight / 100) * (updatedHeight / 100));

            setFormData((prevData) => ({
                ...prevData,
                BMI: updatedBMI.toFixed(2),
            }));
        }
    };
    const handleModalClose = () => {
        onClose();
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_URL}api/stata/${id}`,
                formData
            );
            if (response.status === 200) {
                SetData()
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
        <div className='modal' onClick={handleModalClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <label>
                    Рост см:
                    <input
                        type='text'
                        name='height'
                        value={formData.height}
                        onChange={handleChange}
                        placeholder='Введите рост'
                    />
                </label>
                <br />
                <label>
                    Вес кг:
                    <input
                        type='text'
                        name='weight'
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder='Введите вес'
                    />
                </label>
                <br />
                <label>
                    Объем груди см:
                    <input
                        type='text'
                        name='chest'
                        value={formData.chest}
                        onChange={handleChange}
                        placeholder='Введите объем груди'
                    />
                </label>
                <br />
                <label>
                    Объем талии см:
                    <input
                        type='text'
                        name='waist'
                        value={formData.waist}
                        onChange={handleChange}
                        placeholder='Введите объем талии'
                    />
                </label>
                <br />
                <label>
                    Объем бедер см:
                    <input
                        type='text'
                        name='hips'
                        value={formData.hips}
                        onChange={handleChange}
                        placeholder='Введите объем бедер'
                    />
                </label>
                <br />
                <label>
                    ИМТ:
                    <input
                        type='text'
                        name='BMI'
                        value={formData.BMI}
                        onChange={handleChange}
                        placeholder='BMI'
                        readOnly
                    />
                </label>
                <br />
                <EditButton onClick={handleSubmit}>Отправить данные</EditButton>
            </div>
        </div>
    );
};

export default StataInput;
