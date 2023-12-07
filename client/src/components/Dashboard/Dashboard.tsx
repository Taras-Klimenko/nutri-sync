import { ReactElement } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MenuButton from '../Dashboard/MenuButton.tsx';
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
          <MenuButton>Добавить клиента</MenuButton>
          {/* <div className='button-add'> Добавить клиента</div> */}
        </Link>
        <Link to="/knowledge">
          <MenuButton>База знаний</MenuButton>
          {/* <div className='button-add'> База знаний</div> */}
        </Link>
        <Link to="/all-curator">
          <MenuButton>Все кураторы</MenuButton>
          {/* <div className='button-add'> Все кураторы</div> */}
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
