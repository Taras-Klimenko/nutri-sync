import { ReactElement, MouseEvent } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import {Link} from "react-router-dom";

interface DashboardProps {}

export default function Dashboard({}: DashboardProps): ReactElement {


    const baza = (event: MouseEvent<HTMLButtonElement>) => {
        // Ваша логика для кнопки "Baza"
    };

    return (
        <div>
            <Link to="/add-clients">
                <MyButton>Add Client</MyButton>
            </Link>

            <MyButton onClick={baza}>Baza</MyButton>
            <AllClients />
            <TodoDasbord />
        </div>
    );
}
