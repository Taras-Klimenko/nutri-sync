import { ReactElement, MouseEvent } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';

interface DashbordProps {}

export default function Dashbord({}: DashbordProps): ReactElement {
    const addClient = (event: MouseEvent<HTMLButtonElement>) => {
        // Ваша логика для кнопки "AddClients"
    };

    const baza = (event: MouseEvent<HTMLButtonElement>) => {
        // Ваша логика для кнопки "Baza"
    };

    return (
        <div>
            <MyButton onClick={addClient}>AddClients</MyButton>
            <MyButton onClick={baza}>Baza</MyButton>
            <AllClients />
            <TodoDasbord />
        </div>
    );
}
