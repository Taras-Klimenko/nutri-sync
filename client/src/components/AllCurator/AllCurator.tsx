import { useAppDispatch, useAppSelector } from '../../redux/store/hooks.ts';
import { useEffect } from 'react';
import { getCurators } from '../../redux/store/thunkActions.ts';
import MyButton from '../MyButton/MyButton.tsx';
import { Link } from 'react-router-dom';
import './AllCurator.css';


export default function AllCurator() {
  const dispatch = useAppDispatch();
  const { curators } = useAppSelector((store) => store.clientSlice);

  useEffect(() => {
    dispatch(getCurators());
  }, [dispatch]);
  return (
    <div className='allCurator'>
    
       <div className='allCurator-title'>Кураторы:</div> 
        {curators &&
          curators.map((curator) => (
            <div
              key={curator.id}
              value={curator.id}
              style={{
        
                border: '2px solid #000',
                borderRadius: '5px',
                padding: '10px',
                marginTop: '20px',
                paddingLeft: '20px',
               marginRight:'15px'
              }}
            >
              <p>Логин: {curator.login}</p>
              <p>Имя: {curator.name}</p>
              <p>Пароль: {curator.email}</p>
            </div>
          ))}
     
      {/* <Link to="/reg">
        <MyButton>Добавить куратора</MyButton>
      </Link> */}
    </div>
  );
}
