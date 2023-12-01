import MyButton from "../MyButton/MyButton.tsx";
import { useAppSelector } from "../../redux/store/hooks.ts";
import { Link } from "react-router-dom";
import styles from './AllClients.module.css'; // Замените на путь к вашему файлу стилей

export default function AllClients() {
    const { clients } = useAppSelector((store) => store.clientSlice);
    return (
        <div className={styles.allClients}>
            <h2>All Clients</h2>
            <div>
                {clients.map((client) => (
                    <div key={client.id} className={styles.clientItem}>
                       <div>{client.firstName} {client.lastName}</div>
                        <div>
                            <Link to={`/clients/${client.id}`} state={{ id: client.id }}>
                                <MyButton>Info</MyButton>
                            </Link>
                            <Link to={`/client/${client.id}`} state={{ id: client.id }}>
                                <MyButton>Redact</MyButton>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
