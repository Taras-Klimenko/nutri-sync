import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from './slice/clientSlice.ts';
import { userSlice } from './slice/userSlice.ts';

export const store = configureStore({
  reducer: { clientSlice: clientSlice.reducer, userSlice: userSlice.reducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
