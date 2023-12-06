import { ReactElement } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import { Link } from 'react-router-dom';
import ClientsInWork from '../ClientsInWork/ClientsInWork.tsx';
import './Dachboard.css';


interface DashboardProps {}

export default function Dashboard({}: DashboardProps): ReactElement {
  return (
    <div>
      <div  
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '130px',
        }}
      >
        <Link to="/add-clients">
          {/* <MyButton>Добавить клиента</MyButton> */}
          <div className='button-add'> Добавить клиента</div>
        </Link>
        <Link to="/knowledge">
          {/* <MyButton>База знаний</MyButton> */}
          <div className='button-add'> База знаний</div>
        </Link>
        <Link to="/all-curator">
          {/* <MyButton>Все кураторы</MyButton> */}
          <div className='button-add'> Все кураторы</div>
        </Link>
      </div>
      <div className='addClients'
        style={{
          display: 'flex',
         
          alignItems: 'center',
        }}
      >
        <AllClients />
        <div className='addTodo'
          style={{
            display: 'flex',
           
            marginBottom: '20px',
          }}
        >
          <TodoDasbord />
        </div>
      
      </div>
    </div>
  );
}
