import MyButton from '../MyButton/MyButton.tsx';
import { Link } from 'react-router-dom';
import styles from './AllClients.module.css'; // Замените на путь к вашему файлу стилей
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { getClients } from '../../redux/store/thunkActions.ts';
import { useEffect } from 'react';

export default function AllClients() {
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((store) => store.clientSlice);
  const { login } = useAppSelector((store) => store.userSlice);
  const filteredCliens = clients.filter((element) => {
    return element?.Curator?.login === login;
  });

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  return (
    <div className={styles.allClients}>
      <h2>All Clients</h2>
      <div>
        {filteredCliens.map((client) => (
          <div key={client.id} className={styles.clientItem}>
            <div>
              {client.firstName} {client.lastName}
            </div>
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
