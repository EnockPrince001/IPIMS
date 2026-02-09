// src/data/models/Auth.ts
// Define interfaces for authentication and authorization data

export interface IUser {
  id: string;
  username: string;
  email: string;
  roleId: string;
  roleName: string;
  // TODO: Add more user-related fields
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  // TODO: Add more role-related fields, e.g., if roles have hierarchical structure
}

export interface IPermission {
  entity: string; // The subject, e.g., 'PharmacyProduct', 'Patient', 'SaleOrder'
  permissions: {
    ReadPermission?: boolean;
    CreatePermission?: boolean;
    UpdatePermission?: boolean;
    DeletePermission?: boolean;
    ActivatePermission?: boolean;
    ExportPermission?: boolean;
    // TODO: Add other specific permission types relevant to your entities
    // e.g., 'DispensePermission', 'VerifyPermission'
    [key: string]: boolean | undefined; // Allow for flexible extra permissions
  };
  // TODO: Add any conditions if your permissions are conditional
  // conditions?: Record<string, any>;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number; // In seconds, or provide expiration date/time
}
