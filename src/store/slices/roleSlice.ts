import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { RoleState, Role } from '../types';

// Async Thunk to fetch roles (Placeholder for Apollo Client integration)
// In the future, we will call the Apollo Client here or pass it in.
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
    try {
        // TODO: Replace with actual Apollo Client call
        // const { data } = await client.query({ query: ALL_ROLE });
        // return data.roles;

        // Simulating API call for now
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return [] as Role[];
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to fetch roles');
    }
});

const initialState: RoleState = {
    roles: [],
    loading: false,
    error: null,
};

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        // Standard synchronous reducers can go here if needed
        clearRoles(state) {
            state.roles = [];
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearRoles } = roleSlice.actions;
export default roleSlice.reducer;
