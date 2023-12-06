import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { useEffect } from 'react';
import { getCurators } from '../../redux/store/thunkActions.ts';
import MyButton from '../MyButton/MyButton.tsx';
import { Link } from 'react-router-dom';

export default function AllCurator() {
  const dispatch = useAppDispatch();
  const { curators } = useAppSelector((store) => store.clientSlice);

  useEffect(() => {
    dispatch(getCurators());
  }, [dispatch]);
  return (
    <div>
      <label>
        Кураторы:
        {curators &&
          curators.map((curator) => (
            <div
              key={curator.id}
              value={curator.id}
              style={{
                border: '2px solid #000',
                padding: '10px',
                marginBottom: '20px',
                marginTop: '20px',
              }}
            >
              <p>Логин: {curator.login}</p>
              <p>Имя: {curator.name}</p>
              <p>Пароль: {curator.email}</p>
            </div>
          ))}
      </label>
      <Link to="/reg">
        <MyButton>Добавить куратора</MyButton>
      </Link>
    </div>
  );
}
