// src/scenes/UserManagement/UsersTable.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { IUser } from '../../data/models';
import { userService } from '../../services';
import UserForm from './UserForm'; // Assuming a form for users

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'roleName', headerName: 'Role', width: 150 },
    // TODO: Add more columns as needed (e.g., isActive, lastLogin)
  ];

  const actions = [
    {
      key: 'ADD',
      button_name: 'Add User',
      Show_Button: true,
      permission: 'create',
      entity: 'User',
    },
    {
      key: 'EDIT',
      button_name: 'Edit User',
      Show_Button: true,
      permission: 'update',
      entity: 'User',
    },
    {
      key: 'DELETE',
      button_name: 'Delete User',
      Show_Button: true,
      permission: 'delete',
      entity: 'User',
      onClick: (row: IUser) => {
        // TODO: Implement delete logic
        console.log('Deleting user:', row.username);
      },
    },
    // TODO: Add actions like 'Reset Password', 'Assign Role'
  ];

  if (loading) return <Typography>Loading users...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <GenericDataGrid
      title="User Management"
      subtitle="Manage pharmacy staff accounts and their roles."
      data={users}
      columns={columns}
      actions={actions}
      FormComponent={UserForm}
      onRefresh={fetchUsers}
    />
  );
};

export default UsersTable;
