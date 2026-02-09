// src/store/reducers/pharmacyConfigReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PharmacyConfigState {
  pharmacyName: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  taxRate: number;
  defaultCurrency: string;
  dispensingRules: any; // TODO: Define specific type for dispensing rules
  isLoading: boolean;
  error: string | null;
}

const initialState: PharmacyConfigState = {
  pharmacyName: 'IPIMS Pharmacy',
  address: '123 Main St, City, Country',
  contactEmail: 'info@ipimspharmacy.com',
  contactPhone: '+1234567890',
  taxRate: 0.08, // Example: 8% tax
  defaultCurrency: 'USD',
  dispensingRules: {},
  isLoading: false,
  error: null,
};

const pharmacyConfigSlice = createSlice({
  name: 'pharmacyConfig',
  initialState,
  reducers: {
    fetchPharmacyConfigStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPharmacyConfigSuccess: (state, action: PayloadAction<PharmacyConfigState>) => {
      state.isLoading = false;
      Object.assign(state, action.payload); // Update all config fields
    },
    fetchPharmacyConfigFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTaxRate: (state, action: PayloadAction<number>) => {
      state.taxRate = action.payload;
    },
    // TODO: Add reducers for updating other configuration settings
  },
});

export const {
  fetchPharmacyConfigStart,
  fetchPharmacyConfigSuccess,
  fetchPharmacyConfigFailure,
  updateTaxRate,
} = pharmacyConfigSlice.actions;

export const pharmacyConfigReducer = pharmacyConfigSlice.reducer;
