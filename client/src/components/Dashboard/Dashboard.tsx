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
    <div className='dashboard'>
      <div className="addClients">
          <AllClients />
      </div>
        <div className="addTodo">
          <TodoDasbord />
        </div>
    </div>
  );
}
