import  { useState } from 'react';
import styles from './AddClients.module.css';
import MyButton from "../MyButton/MyButton.tsx";

export default function AddClients() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        paidTill: '',
        phoneNumber: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddClient = () => {
        // Здесь вы можете выполнить действия с данными, например, отправить их на сервер
        console.log('Adding client:', formData);
    };

    return (
        <div className={styles.container}>
            <h2>Add Client</h2>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} placeholder='Firstname' onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} placeholder='Secondname' onChange={handleChange} />
            </label>
            <label>
                Birthday:
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
            </label>
            <label>
                Paid Till:
                <input type="date" name="paidTill" value={formData.paidTill} onChange={handleChange} />
            </label>
            <label>
                Phone Number:
                <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder='Phone' onChange={handleChange} />
            </label>
            <MyButton onClick={handleAddClient}>Add Client</MyButton>
        </div>
    );
}
