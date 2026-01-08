import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CustomState, MegaModel } from '../types';

// Initial State matching the legacy "MegaModel" structure
const initialState: CustomState = {
    customData: {
        dashboardModel: {
            firstCard: null,
            secondCard: null,
            thirdCard: null,
            fourthCard: null,
        },
        caseManagementModel: {
            caseDetails: null,
            caseDashboard: null,
            documentUploads: {
                currentDocument: null,
                loadingState: null,
            },
        },
    },
    status: 'idle',
    error: null,
};

const customSlice = createSlice({
    name: 'custom',
    initialState,
    reducers: {
        // Replaces FETCH_DETAILS_SUCCESS
        setCustomData(state, action: PayloadAction<MegaModel>) {
            state.customData = action.payload;
            state.status = 'success';
            state.error = null;
        },
        // Replaces FETCH_DETAILS_ERROR / UPDATE_DETAILS_ERROR
        setError(state, action: PayloadAction<string>) {
            state.status = 'error';
            state.error = action.payload;
        },
        // Replaces UPDATE_ACTIVE_DOCUMENT
        updateDocument(state, action: PayloadAction<any>) {
            state.customData.caseManagementModel.documentUploads.currentDocument = action.payload;
            state.status = 'success';
        },
        // Replaces REFRESH_DOCUMENTS_TABLE
        setDocumentLoadingState(state, action: PayloadAction<any>) {
            state.customData.caseManagementModel.documentUploads.loadingState = action.payload;
            state.status = 'success';
        },
    },
});

export const { setCustomData, setError, updateDocument, setDocumentLoadingState } = customSlice.actions;

export default customSlice.reducer;
