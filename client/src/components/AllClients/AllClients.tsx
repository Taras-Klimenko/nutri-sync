import MyButton from "../MyButton/MyButton.tsx";
import {useAppSelector} from "../../redux/store/hooks.ts";
import {Link} from "react-router-dom";


export default function AllClients() {
    const {clients} = useAppSelector((store) => store.clientSlice)
    return (
        <div>
            <h2>All Clients</h2>
            <div>
                {clients.map(client => (
                    <div key={client.id}>
                        {client.firstName} {client.lastName}
                        <Link to={`/clients/${client.id}`} state={{id: client.id, }}>
                            <MyButton>more...</MyButton>
                        </Link>
                        <Link to={`/clients/${client.id}`} state={{id: client.id, }}>
                            <MyButton>info</MyButton>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};
