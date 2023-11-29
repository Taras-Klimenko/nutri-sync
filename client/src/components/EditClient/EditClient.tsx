import React, { useEffect, useState } from 'react';
import { Client } from "../../types.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks.ts";
import MyButton from "../MyButton/MyButton.tsx";
import {deleteClient, getCurators, updateClient} from "../../redux/store/thunkActions.ts";

interface EditClientProps {
    client: Client;
}

export default function EditClient(props: EditClientProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const clients = useAppSelector((store) => store.clientSlice.clients);
    const {curators} = useAppSelector((store) => store.clientSlice)
    // const initFormData : Client = {
    //     id: null,
    // firstName: '',
    // lastName: '',
    // birthday: Date,
    // paidTill: Date,
    // phoneNumber: '',
    // curatorId: null,
    // createdAt: Date,
    // updatedAt: Date,
    // Curator: {}
    // }
    const [formData, setFormData] = useState<Client>();

    useEffect(() => {
        const selectedClient = clients.find((client) => client.id === Number(id));


        if (selectedClient) {
            setFormData(selectedClient);
        } else {

        }
    }, [id, clients]);

    useEffect(() => {
        dispatch(getCurators());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateClient = () => {
        dispatch(updateClient(formData));
        navigate("/dashboard");
    };
    const handleDeleteClient = () => {
        dispatch(deleteClient(formData.id));
        navigate("/dashboard");
    };

    console.log(formData)
    return (
        <>
            {formData?
                <div>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
                    </label>
                    <label>
                        Birthday: <br/>
                        Birthday: {formData.birthday.toString().slice(0, 10)}
                        <input type="date" name="birthday" value={formData.birthday.toString()} onChange={handleChange} />
                    </label>
                    <label>
                        Paid Till: <br/>
                        Paid Till: {formData.paidTill.toString().slice(0, 10)}
                        <input type="date" name="paidTill" value={formData.paidTill.toString()} onChange={handleChange} />
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder="Phone" onChange={handleChange} />
                    </label>
                    <label>
                        Curator:<br/>
                        Curator: {formData?.Curator?.name}
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
                    <MyButton onClick={handleUpdateClient}>Update</MyButton>
                    <MyButton onClick={handleDeleteClient}>Delete</MyButton>
                    <Link to="/dashboard">
                        <MyButton>Back</MyButton>
                    </Link>
                </div> :<div>!!!!!!!!</div>}
        </>
    );
}
