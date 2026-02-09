// src/store/actions/uiActions.ts
import { createAction } from '@reduxjs/toolkit';

export const toggleSidebar = createAction('ui/toggleSidebar');
export const toggleDarkMode = createAction('ui/toggleDarkMode');
export const showNotification = createAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>(
  'ui/showNotification'
);
export const hideNotification = createAction('ui/hideNotification');

// TODO: Add more global UI actions here (e.g., showGlobalSpinner, hideGlobalSpinner)
