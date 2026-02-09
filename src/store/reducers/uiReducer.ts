// src/store/reducers/uiReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  notification: {
    message: string | null;
    type: 'success' | 'error' | 'info' | 'warning' | null;
    isOpen: boolean;
  };
  // TODO: Add more global UI states like loading spinners, modal visibility, etc.
}

const initialState: UiState = {
  isSidebarOpen: true,
  isDarkMode: false, // Default to light mode
  notification: {
    message: null,
    type: null,
    isOpen: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>
    ) => {
      state.notification = { ...action.payload, isOpen: true };
    },
    hideNotification: (state) => {
      state.notification = { message: null, type: null, isOpen: false };
    },
    // TODO: Add reducers for managing loading states, global modals, etc.
  },
});

export const { toggleSidebar, toggleDarkMode, showNotification, hideNotification } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
