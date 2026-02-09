// src/scenes/RoleManagement/RolesTable.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { IRole } from '../../data/models';
import { userService } from '../../services';
import RoleForm from './RoleForm'; // Assuming a form for roles

const RolesTable: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getRoles();
      setRoles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Role Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    // TODO: Add column for number of users in role, or link to users
  ];

  const actions = [
    {
      key: 'ADD',
      button_name: 'Add Role',
      Show_Button: true,
      permission: 'create',
      entity: 'Role',
    },
    {
      key: 'EDIT',
      button_name: 'Edit Role',
      Show_Button: true,
      permission: 'update',
      entity: 'Role',
    },
    {
      key: 'ASSIGN_PERMISSIONS',
      button_name: 'Assign Permissions',
      Show_Button: true,
      permission: 'manage', // manage permissions on Role
      entity: 'Role',
      onClick: (row: IRole) => {
        // TODO: Navigate to a separate screen for assigning permissions to this role
        console.log('Assigning permissions for role:', row.name);
      },
    },
    // TODO: Add 'Delete' action
  ];

  if (loading) return <Typography>Loading roles...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <GenericDataGrid
      title="Role Management"
      subtitle="Define and manage user roles within the pharmacy."
      data={roles}
      columns={columns}
      actions={actions}
      FormComponent={RoleForm}
      onRefresh={fetchRoles}
    />
  );
};

export default RolesTable;
