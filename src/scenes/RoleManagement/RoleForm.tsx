// src/scenes/RoleManagement/RoleForm.tsx
import React from 'react';
import { TextField, Box } from '@mui/material';
import { FormikForm } from '../../components/common';
import * as Yup from 'yup';
import { IRole } from '../../data/models';
import { userService } from '../../services';

interface RoleFormProps {
  initialValues?: IRole;
  onSuccess: () => void;
  onCancel: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ initialValues, onSuccess, onCancel }) => {
  const defaultInitialValues: IRole = {
    id: '',
    name: '',
    description: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Role Name is required'),
    description: Yup.string().optional(),
  });

  const handleSubmit = async (values: IRole, { setSubmitting }: any) => {
    try {
      if (values.id) {
        // TODO: Call userService.updateRole(values.id, values);
        console.log('Updating role:', values);
      } else {
        // TODO: Call userService.createRole(values);
        console.log('Creating role:', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save role:', error);
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
          name="name"
          label="Role Name"
          fullWidth
          required
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
        />
      </Box>
    </FormikForm>
  );
};

export default RoleForm;
