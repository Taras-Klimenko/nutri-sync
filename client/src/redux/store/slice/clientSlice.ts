import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Client, Curator, Task} from "../../../types.ts";
import {
    addClient,
    getClients,
    getCurators,
    updateClient,
    deleteClient,
    getTodos,
    addTodos,
    updateTodoStatus, updateTodo, deleteTodo, getClientsCurator
} from "../thunkActions.ts";


interface IInitialState {
    clients: Client[];
    curators: Curator[];
    todos: Task[];
    loader: boolean;
}

const initialState: IInitialState = {
    clients: [],
    curators: [],
    todos: [],
    loader: false,
};

export const clientSlice = createSlice({
    name: "clients",
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
            getClientsCurator.fulfilled,
            (state, action: PayloadAction<Client[]>) => {
                state.clients = action.payload;
                state.loader = false;
            }
        );
        builder.addCase(getClientsCurator.pending, (state) => {
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
                    state.clients[updatedClientIndex] = action.payload;
                }
                state.loader = false;
            }
        );
        builder.addCase(updateClient.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(
            deleteClient.fulfilled,
            (state, action: PayloadAction<number | string>) => {
                const deletedClientId = action.payload;
                state.clients = state.clients.filter(client => client.id !== deletedClientId);
                state.loader = false;
            }
        );
        builder.addCase(deleteClient.pending, (state) => {
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
        builder
            .addCase(getTodos.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.todos = action.payload;
            })
            .addCase(addTodos.fulfilled, (state, action: PayloadAction<Task>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoStatus.fulfilled, (state, action: PayloadAction<Task>) => {
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo)
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Task>) => {
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                );
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string | number>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });

    },
});
