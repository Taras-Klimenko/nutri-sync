import {useAppSelector} from "../../redux/store/hooks.ts";

export default function ClientsInWork() {
    const {clients} = useAppSelector((store) => store.clientSlice)
const client= clients.length
    const buttonStyle = {
        display: "inline-block",
        padding: "10px 20px",
        fontSize: "20px",
        cursor: "pointer",
        textAlign: "center",
        textDecoration: "none",
        outline: "none",
        border: "2px solid #3498db",
        color: "#9d1150",
        backgroundColor: "#d8cbcb",
        borderRadius: "5px",
        transition: "background-color 0.3s, color 0.3s",
        marginTop: "20px"
    };


    return (
        <div style={buttonStyle}>
            Clients In Work: {client}
        </div>

    )
};
