// src/data/RBAC/transformPermissions.ts
// This file is responsible for transforming raw permission data from the backend
// into a format suitable for `defineAbilitiesFor` in `ability.ts`.

// The structure of `rawPermissions` should align with what your backend provides.
// For this scaffolding, we'll assume a structure similar to the Shoe POS:
// An array of roles, where each role has children representing entities/modules
// with specific permissions.

import { IPermission } from "../models/Auth"; // Assuming you define this type

interface RawRoleChild {
  title: string; // The entity name, e.g., "PharmacyProduct"
  permissions: {
    ReadPermission?: boolean;
    CreatePermission?: boolean;
    UpdatePermission?: boolean;
    DeletePermission?: boolean;
    ActivatePermission?: boolean;
    ExportPermission?: boolean;
    [key: string]: boolean | undefined; // Allow other custom permissions
  };
}

interface RawRole {
  title: string; // Role name, e.g., "Pharmacist"
  children: RawRoleChild[];
}

/**
 * Transforms raw role and permission data from the backend into a standardized
 * IPermission[] array for use with CASL's `defineAbilitiesFor`.
 *
 * @param rawPermissions An array of raw role/permission objects from the API.
 * @returns An array of IPermission objects.
 */
export function transformRawPermissionsToIPermission(rawPermissions: RawRole[]): IPermission[] {
  const transformed: IPermission[] = [];

  // TODO: Implement the actual transformation logic based on your backend's response format.
  // This is a placeholder and should be adapted.

  if (!rawPermissions || rawPermissions.length === 0) {
    return transformed;
  }

  rawPermissions.forEach(role => {
    role.children.forEach(child => {
      transformed.push({
        entity: child.title,
        permissions: child.permissions
      });
    });
  });

  return transformed;
}

// TODO: Example of how you might fetch/use this
// import { transformRawPermissionsToIPermission } from './transformPermissions';
// import { defineAbilitiesFor } from './ability';
//
// async function setupUserAbilities(userId: string) {
//   // const rawPermissions = await authService.fetchUserPermissions(userId); // Assuming an authService
//   // const ipPermissions = transformRawPermissionsToIPermission(rawPermissions);
//   // const userAbility = defineAbilitiesFor(ipPermissions);
//   // return userAbility;
//   return []; // Placeholder
// }
