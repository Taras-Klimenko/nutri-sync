import { ReactElement } from 'react';
import AllClients from '../AllClients/AllClients.tsx';
import TodoDasbord from '../TodoDasbord/TodoDasbord.tsx';
import MyButton from '../MyButton/MyButton.tsx';
import {Link} from "react-router-dom";
import ClientsInWork from "../ClientsInWork/ClientsInWork.tsx";


interface DashboardProps {}

export default function Dashboard({}: DashboardProps): ReactElement {

  return (
      <div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Link to="/add-clients">
                  <MyButton>Add Client</MyButton>
              </Link>
              <Link to="/knowledge">
                  <MyButton>Baza</MyButton>
              </Link>
              <Link to="/all-curator">
                  <MyButton>All Curator</MyButton>
              </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <AllClients />
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <TodoDasbord />
              </div>
              <ClientsInWork />
          </div>
      </div>

  );

    }
