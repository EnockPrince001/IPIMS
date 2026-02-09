// src/store/actions/pharmacyConfigActions.ts
import { createAction } from '@reduxjs/toolkit';
import { PharmacyConfigState } from '../reducers/pharmacyConfigReducer'; // Import type

export const fetchPharmacyConfigStart = createAction('pharmacyConfig/fetchPharmacyConfigStart');
export const fetchPharmacyConfigSuccess = createAction<PharmacyConfigState>('pharmacyConfig/fetchPharmacyConfigSuccess');
export const fetchPharmacyConfigFailure = createAction<string>('pharmacyConfig/fetchPharmacyConfigFailure');
export const updateTaxRate = createAction<number>('pharmacyConfig/updateTaxRate');

// TODO: Add thunks for async fetching/updating pharmacy config
// export const fetchPharmacyConfig = () => async (dispatch: AppDispatch) => {
//   dispatch(fetchPharmacyConfigStart());
//   try {
//     const response = await setupService.getPharmacyConfig(); // Assuming setupService exists
//     dispatch(fetchPharmacyConfigSuccess(response.data));
//   } catch (error: any) {
//     dispatch(fetchPharmacyConfigFailure(error.message));
//   }
// };
