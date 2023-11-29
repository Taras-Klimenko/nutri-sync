import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Client, Curator} from "../../../types.ts";
import { addClient, getClients, getCurators, updateClient  } from "../thunkActions.ts";


interface IInitialState {
    clients: Client[];
    curators: Curator[];
    loader: boolean;
}

const initialState: IInitialState = {
    clients: [],
    loader: false,
};

export const clientSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(
            getClients.fulfilled,
            (state, action: PayloadAction<Client[]>) => {
                state.clients = action.payload;
                state.loader = false;
            }
        );
        builder.addCase(getClients.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(
            addClient.fulfilled,
            (state, action: PayloadAction<Client>) => {
                state.clients.push(action.payload);
                state.loader = false;
            }
        );
        builder.addCase(addClient.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(
            updateClient.fulfilled,
            (state, action: PayloadAction<Client>) => {
                const updatedClientIndex = state.clients.findIndex(client => client.id === action.payload.id);
                if (updatedClientIndex !== -1) {
                    // Заменяем существующего клиента обновленными данными
                    state.clients[updatedClientIndex] = action.payload;
                }
                state.loader = false;
            }
        );
        builder.addCase(updateClient.pending, (state) => {
            state.loader = true;
        });

        builder.addCase(
            getCurators.fulfilled,
            (state, action: PayloadAction<Curator[]>) => {
                state.curators = action.payload;
                state.loader = false;
            }
        );
        builder.addCase(getCurators.pending, (state) => {
            state.loader = true;
        });

    },
});
