import axios from 'axios';
import { useState } from 'react';
import EditButton from '../EditButton/EditButton';
import './EditModal.css'



const EditModal = ({ data, onSave, onDelete, onClose, setData }) => {
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
    const bmi = (editedData.weight / (heightInMeters * heightInMeters)).toFixed(
      2
    );
    return isNaN(bmi) ? '' : bmi;
  };

  const handleSave = async () => {
    const bmi = calculateBMI();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL}api/stata/update/${editedData.id}`,
        { ...editedData, BMI: bmi }
      );
      console.log(response.data);
      onSave({ ...editedData, BMI: bmi });
      setData()
      onClose();
    } catch (error) {
      console.error('Произошла ошибка при обновлении данных:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}api/stata/update/${data.id}`
      );
      onDelete(data.id);
    } catch (error) {
      console.error('Произошла ошибка при удалении данных:', error);
    }
    setTimeout(() => {
        setData()
      onClose();
    }, 500);
  };

  return (
    <div className='edit'>
      <h4>Редактируем данные за: {editedData.createdAt.slice(0, 10)}</h4>
      <label>
        Рост см:
        <br />
        <input
          type="text"
          name="height"
          value={editedData.height}
          onChange={handleChange}
          style={{ width: '80%', fontSize: '12px' }}
        />
      </label>
      <br />
        <label>
            Вес кг:<br/>
            <input
                type="text"
                name="weight"
                value={editedData.weight}
                onChange={handleChange}
                style={{width: '80%', fontSize: '12px'}}
            />
        </label>
        <br />
      <label>
        Объем груди см:
        <input
          type="text"
          name="chest"
          value={editedData.chest}
          onChange={handleChange}
          style={{ width: '80%', fontSize: '12px' }}
        />
      </label>
      <br />
      <label>
        Объем талии см:
        <input
          type="text"
          name="waist"
          value={editedData.waist}
          onChange={handleChange}
          style={{ width: '80%', fontSize: '12px' }}
        />
      </label>
      <br />
      <label>
        Объем бедер см:
        <input
          type="text"
          name="hips"
          value={editedData.hips}
          onChange={handleChange}
          style={{ width: '80%', fontSize: '12px' }}
        />
      </label>
      <br />
      <label>
        Индекс массы тела:
        <input type="text" name="BMI" value={calculateBMI()} readOnly
               style={{ width: '80%', fontSize: '12px' }} />
      </label>
        <div>
      <EditButton onClick={handleSave}>Сохранить</EditButton>
      <EditButton onClick={handleDelete}>Удалить</EditButton>
      <EditButton onClick={onClose}>Отмена</EditButton>
      </div>
    </div>
  );
};

export default EditModal;
