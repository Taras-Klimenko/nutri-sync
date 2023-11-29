import { useEffect, useState } from 'react';
import axios from 'axios';
import MyButton from "../MyButton/MyButton.tsx";
import {Client} from "../../types.ts";


export default function AllClients() {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Client[]>('http://localhost:3000/clients');
                setClients(response.data as Client[]);
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

    return (
        <div>
            <h2>All Clients</h2>
            <div>
                {clients.map(client => (
                    <div key={client.id}>
                        {client.firstName} {client.lastName}
                        <MyButton>more...</MyButton>
                    </div>
                ))}
            </div>
        </div>
    )
};
