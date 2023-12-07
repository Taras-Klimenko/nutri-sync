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
    <div className="allCuratorContainer">
      <h2>Кураторы:</h2>
      <div className="allCurators">
        {curators &&
          curators.map((curator) => (
            <div key={curator.id} value={curator.id} className="curatorCard">
              <p>
                <span>Имя:</span> {curator.name}
              </p>
              <p>
                <span>Логин:</span> {curator.login}
              </p>
              <p>
                <span>Пароль:</span> {curator.email}
              </p>
            </div>
          ))}

      </div>
      <Link to="/reg">
        <MyButton>Добавить</MyButton>
      </Link>

    </div>
  );
}
