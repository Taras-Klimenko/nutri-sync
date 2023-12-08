import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from './slice/clientSlice.ts';
import { userSlice } from './slice/userSlice.ts';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorage.js';

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: { clientSlice: clientSlice.reducer, userSlice: userSlice.reducer },
  preloadedState,
});

// store.subscribe(() => {
//   saveToLocalStorage({
//     userSlice: store.getState().userSlice,
//   });
// });

store.subscribe(() => {
  const userState = store.getState().userSlice;
  if (userState && userState.login) {
    saveToLocalStorage({ userSlice: userState });
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
