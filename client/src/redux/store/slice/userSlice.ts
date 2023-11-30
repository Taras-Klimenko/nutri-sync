import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { checkSession } from '../thunkActions';

// Define a type for the slice state
export interface IUserState {
  login: string;
  name: string;
  email: string;
  isAdmin: boolean;
  loader: boolean;
}

// Define the initial state using that type
const initialState: IUserState = {
  login: '',
  name: '',
  email: '',
  isAdmin: false,
  loader: false,
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
    },
    logout: (state: IUserState, action: PayloadAction<IUserState>) => {
      state.login = '';
      state.name = '';
      state.email = '';
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
    });
    builder.addCase(checkSession.pending, (state, action) => {
      state.loader = true;
    });
  },
});

export const { addUser, logout } = userSlice.actions;
