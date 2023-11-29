import { useState, useEffect } from 'react';
import styles from './AddClients.module.css';
import MyButton from '../MyButton/MyButton';
import axios from 'axios';
import {Client} from "../../types.ts";
import {Link, useNavigate} from "react-router-dom";

export default function AddClients() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Client>({
        firstName: '',
        lastName: '',
        birthday: '',
        paidTill: '',
        phoneNumber: '',
        curatorId: '',
    });

    const [curatorInfo, setCuratorInfo] = useState(null);

    useEffect(() => {
        const fetchCuratorInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/curator'); // Замените на свой URL
                setCuratorInfo(response.data);
            } catch (error) {
                console.error(`Ошибка запроса куратора: ${error.message}`);
            }
        };

        fetchCuratorInfo();
    }, []);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddClient = async () => {
        try {
            const response = await axios.post('http://localhost:3000/clients', formData);

            setFormData({
                firstName: '',
                lastName: '',
                birthday: '',
                paidTill: '',
                phoneNumber: '',
            });
            navigate(`/dashboard`);
        } catch (error) {

            console.error('Error adding client:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add Client</h2>
            <label>
                First Name:
                <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required/>
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} placeholder="Second Name" onChange={handleChange} />
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
                <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder="Phone" onChange={handleChange} />
            </label>
            <label>
                Curator:
                <select name="curatorId" value={formData.curatorId} onChange={handleChange}>
                    <option value="">Select Curator</option>
                    {curatorInfo &&
                        curatorInfo.map((curator) => (
                            <option key={curator.id} value={curator.id}>
                                {curator.name}
                            </option>
                        ))}
                </select>
            </label>
            <MyButton onClick={handleAddClient}>Add Client</MyButton>
            <Link to="/dashboard">
                <MyButton>Back</MyButton>
            </Link>
        </div>
    );
}
