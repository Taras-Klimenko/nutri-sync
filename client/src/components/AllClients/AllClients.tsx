import MyButton from '../MyButton/MyButton.tsx';
import { useAppSelector } from '../../redux/store/hooks.ts';
import { Link } from 'react-router-dom';
import styles from './AllClients.module.css'; // Замените на путь к вашему файлу стилей
import ClientsInWork from '../ClientsInWork/ClientsInWork.tsx';
import NewBatton from "../ClientCard/NewBatton.tsx";

export default function AllClients() {
  const { clients } = useAppSelector((store) => store.clientSlice);
  return (
    <div className={styles.allClients}>
      <h1>Клиенты</h1>
      <Link to="/add-clients">
        <NewBatton>Добавить клиента</NewBatton>
      </Link>
      <div className={styles.allClient}>
        {clients.map((client) => (
          <div key={client.id} className={styles.clientItem}>
            <div className={styles.font}>
              {client.firstName} {client.lastName}
            </div>
              <div>
                  <Link to={`/clients/${client.id}`} state={{id: client.id}}>
                      <MyButton>Подробнее</MyButton>
                  </Link>
                  <Link to={`/client/${client.id}`} state={{id: client.id}}>
                      <MyButton>Редактировать</MyButton>
                  </Link>
              </div>
          </div>
        ))}
      </div>
      <ClientsInWork />
    </div>
  );
}
