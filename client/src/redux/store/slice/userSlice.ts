import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { addWeight, checkSession, getParameters } from '../thunkActions';

// Define a type for the slice state
export interface IUserState {
  login: string;
  name: string;
  email: string;
  id: number;
  isAdmin: boolean;
  loader: boolean;
  parameters: Array<number>;
}

// Define the initial state using that type
const initialState: IUserState = {
  login: '',
  name: '',
  email: '',
  id: null,
  isAdmin: false,
  loader: false,
  parameters: [],
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state: IUserState, action: PayloadAction<IUserState>) => {
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.id = action.payload.id;
    },
    logout: (state: IUserState, action: PayloadAction<IUserState>) => {
      state.login = '';
      state.name = '';
      state.email = '';
      state.id = 0;
      state.isAdmin = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.loader = false;
      state.id = action.payload.id;
    });
    builder.addCase(checkSession.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getParameters.fulfilled, (state, action) => {
      state.parameters = action.payload;
    });
    builder.addCase(addWeight.fulfilled, (state, action) => {
      state.parameters.push(action.payload);
    });
  },
});

export const { addUser, logout } = userSlice.actions;
