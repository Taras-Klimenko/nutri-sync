import { ReactElement } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import {Link} from "react-router-dom";
import AllCurator from "../AllCurator/AllCurator.tsx";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps): ReactElement {
  return (
    
      // {/* <Link to="/add-clients">
      //   <MyButton>Add Client</MyButton>
      // </Link>
      // <Link to="/knowledge">
      //   <MyButton>Baza</MyButton>
      // </Link> */}

        <div>
            <Link to="/add-clients">
                <MyButton>Add Client</MyButton>
            </Link>
            <Link to="/knowledge">
                <MyButton>Baza</MyButton>
            </Link>
            <AllClients />
            <TodoDasbord />
            <AllCurator/>

        </div>
    );

    }