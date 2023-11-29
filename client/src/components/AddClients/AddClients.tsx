import { useState, useEffect } from 'react';
import styles from './AddClients.module.css';
import MyButton from '../MyButton/MyButton';
import {Client} from "../../types.ts";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store/hooks.ts";
import {addClient, getCurators} from "../../redux/store/thunkActions.ts";

export default function AddClients() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {curators} = useAppSelector((store) => store.clientSlice)

    const [formData, setFormData] = useState<Client>({
        firstName: '',
        lastName: '',
        birthday: '',
        paidTill: '',
        phoneNumber: '',
        curatorId: '',
    });


    useEffect(() => {
        dispatch(getCurators());
    }, [dispatch]);
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddClient = async () => {
        dispatch(addClient(formData))
            setFormData({
                firstName: '',
                lastName: '',
                birthday: '',
                paidTill: '',
                phoneNumber: '',
            });
            navigate(`/dashboard`);
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
                    {curators &&
                        curators.map((curator) => (
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
