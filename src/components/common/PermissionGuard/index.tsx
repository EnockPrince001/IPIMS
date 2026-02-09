// src/components/common/PermissionGuard/index.tsx
import React from 'react';
import { useAbility } from '../../../data/RBAC/ability';
import { Typography } from '@mui/material';

interface PermissionGuardProps {
  action: string;    // e.g., 'read', 'create', 'update'
  subject: string;   // e.g., 'PharmacyProduct', 'Patient'
  fallback?: React.ReactNode; // Content to render if permission is denied
  children: React.ReactNode; // Content to render if permission is granted
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ action, subject, fallback, children }) => {
  const ability = useAbility();

  if (ability.can(action, subject)) {
    return <>{children}</>;
  }

  // If fallback is provided, render it. Otherwise, render nothing.
  return fallback ? <>{fallback}</> : null;
};

export default PermissionGuard;
