// src/scenes/UserManagement/UserForm.tsx
import React from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { FormikForm } from '../../components/common';
import * as Yup from 'yup';
import { IUser, IRole } from '../../data/models';
import { userService } from '../../services';

interface UserFormProps {
  initialValues?: IUser;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSuccess, onCancel }) => {
  const [roles, setRoles] = React.useState<IRole[]>([]);

  React.useEffect(() => {
    userService.getRoles().then(setRoles);
  }, []);

  const defaultInitialValues: IUser = {
    id: '',
    username: '',
    email: '',
    roleId: '',
    roleName: '', // This might be derived from roleId
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    roleId: Yup.string().required('Role is required'),
    // TODO: Add password validation for new users
  });

  const handleSubmit = async (values: IUser, { setSubmitting }: any) => {
    try {
      if (values.id) {
        // TODO: Call userService.updateUser(values.id, values);
        console.log('Updating user:', values);
      } else {
        // TODO: Call userService.createUser(values);
        console.log('Creating user:', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save user:', error);
      // TODO: Show error notification
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues || defaultInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
        />
        <TextField
          name="roleId"
          label="Role"
          select
          fullWidth
          required
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>
        {/* TODO: Add password fields for new user creation or password reset */}
      </Box>
    </FormikForm>
  );
};

export default UserForm;
