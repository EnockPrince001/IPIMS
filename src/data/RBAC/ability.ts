// src/data/RBAC/ability.ts
import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';
import { createContext, useContext } from 'react';
import { IPermission } from '../models/Auth'; // Assuming you define this type

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'activate' | 'export' | string;
type Subjects = 'all' | 'User' | 'Role' | 'PharmacyProduct' | 'Patient' | 'Prescription' | 'SaleOrder' | string;

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

// Initialize with a default ability (e.g., for unauthenticated users)
export const initialAbility = new AppAbility([], {
  detectSubjectType: (object: any) => {
    // TODO: Implement logic to detect subject type based on object properties
    // For example, if (object.hasOwnProperty('drugId')) return 'PharmacyProduct';
    return object.kind; // Assuming a 'kind' property in your models
  },
});

export const AbilityContext = createContext<AppAbility>(initialAbility);

export const useAbility = () => useContext(AbilityContext);

// Function to define abilities based on fetched user permissions
export function defineAbilitiesFor(userPermissions: IPermission[]): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(AppAbility);

  if (userPermissions && userPermissions.length > 0) {
    userPermissions.forEach((perm) => {
      // Example: perm might be { action: 'read', subject: 'PharmacyProduct', conditions: { ... } }
      // Or in the format from Shoe POS: { entity: 'PharmacyProduct', permissions: { ReadPermission: true, CreatePermission: false } }

      // TODO: Adapt this logic to match the actual structure of `userPermissions`
      // coming from your backend (similar to `transformRoleRights.js` in Shoe POS)

      const entity = perm.entity; // e.g., 'PharmacyProduct'
      const permissions = perm.permissions; // e.g., { ReadPermission: true, CreatePermission: false }

      if (permissions?.ReadPermission) can('read', entity);
      if (permissions?.CreatePermission) can('create', entity);
      if (permissions?.UpdatePermission) can('update', entity);
      if (permissions?.DeletePermission) can('delete', entity);
      if (permissions?.ActivatePermission) can('activate', entity);
      if (permissions?.ExportPermission) can('export', entity);
      // TODO: Add more specific actions/permissions as needed (e.g., 'dispense', 'verify')
    });
  } else {
    // Default abilities for unauthenticated or basic users
    can('read', 'all'); // Example: Allow reading all public data
    cannot('manage', 'all'); // Deny all management actions by default
  }

  return build();
}
