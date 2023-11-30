import { ReactElement, MouseEvent } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import {Link} from "react-router-dom";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps): ReactElement {


    return (
        <div>
            <Link to="/add-clients">
                <MyButton>Add Client</MyButton>
            </Link>
            <Link to="/knowledge">
                <MyButton>Baza</MyButton>
            </Link>

            <AllClients />
            <TodoDasbord />
        </div>
    );
}