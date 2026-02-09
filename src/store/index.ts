// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rolesReducer } from './reducers/rolesReducer';
import { uiReducer } from './reducers/uiReducer';
import { pharmacyConfigReducer } from './reducers/pharmacyConfigReducer';

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    ui: uiReducer,
    pharmacyConfig: pharmacyConfigReducer,
    // TODO: Add more reducers here as needed
  },
  // TODO: Add middleware (e.g., for logging, thunks if not using RTK query)
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
