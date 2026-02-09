// src/store/reducers/rolesReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ability } from '@casl/ability';
import { initialAbility } from '../../data/RBAC/ability'; // Import initial ability

interface RolesState {
  ability: Ability;
  userRoles: any[]; // TODO: Define a proper type for user roles
  isLoading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  ability: initialAbility, // Initialize with a default/guest ability
  userRoles: [],
  isLoading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setAbility: (state, action: PayloadAction<Ability>) => {
      state.ability = action.payload;
    },
    setUserRoles: (state, action: PayloadAction<any[]>) => {
      state.userRoles = action.payload;
    },
    fetchRolesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRolesSuccess: (state, action: PayloadAction<any[]>) => {
      state.isLoading = false;
      state.userRoles = action.payload;
    },
    fetchRolesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // TODO: Add more reducers for updating/deleting roles if managed via Redux
  },
});

export const {
  setAbility,
  setUserRoles,
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;
