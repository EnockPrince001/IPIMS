import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import roleReducer from './slices/roleSlice';
import customReducer from './slices/customSlice';

export const store = configureStore({
    reducer: {
        roles: roleReducer,
        custom: customReducer,
    },
    // Redux Toolkit adds thunk middleware by default
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Useful if we store non-serializable data largely (like Dates) in MegaModel
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
