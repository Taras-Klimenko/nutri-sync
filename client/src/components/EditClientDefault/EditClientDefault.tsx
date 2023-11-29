import { useParams } from "react-router-dom";
import EditClient from "../EditClient/EditClient.tsx";

interface Client {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    paidTill: Date;
    phoneNumber: string;
}

export default function EditClientDefault() {
    const { id } = useParams<{ id: string }>();

    const defaultClient: Client = {
        id: parseInt(id, 10),
        firstName: "",
        lastName: "",
        birthday: new Date() as unknown as Date,
        paidTill: new Date() as unknown as Date,
        phoneNumber: "",
    };

    return <EditClient client={defaultClient} />;
}
