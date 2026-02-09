// src/store/actions/rolesActions.ts
import { createAction } from '@reduxjs/toolkit';
import { Ability } from '@casl/ability';

export const setAbility = createAction<Ability>('roles/setAbility');
export const setUserRoles = createAction<any[]>('roles/setUserRoles');
export const fetchRolesStart = createAction('roles/fetchRolesStart');
export const fetchRolesSuccess = createAction<any[]>('roles/fetchRolesSuccess');
export const fetchRolesFailure = createAction<string>('roles/fetchRolesFailure');

// TODO: Add thunks for async role fetching
// export const fetchRoles = () => async (dispatch: AppDispatch) => {
//   dispatch(fetchRolesStart());
//   try {
//     const response = await roleService.fetchRoles(); // Assuming roleService exists
//     dispatch(fetchRolesSuccess(response.data));
//     // After fetching roles, you might want to re-evaluate abilities
//     // const ability = defineAbilitiesFor(response.data);
//     // dispatch(setAbility(ability));
//   } catch (error: any) {
//     dispatch(fetchRolesFailure(error.message));
//   }
// };
