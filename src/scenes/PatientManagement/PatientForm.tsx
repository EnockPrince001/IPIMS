// src/scenes/PatientManagement/PatientForm.tsx
import React from 'react';
import { TextField, Box } from '@mui/material';
import { FormikForm } from '../../components/common';
import * as Yup from 'yup';
import { IPatient } from '../../data/models';
import { patientService } from '../../services';

interface PatientFormProps {
  initialValues?: IPatient;
  onSuccess: () => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ initialValues, onSuccess, onCancel }) => {
  const defaultInitialValues: IPatient = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    contactNumber: '',
    address: '',
    medicalHistory: '',
    allergies: [],
    insuranceInfo: { provider: '', policyNumber: '' },
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    contactNumber: Yup.string().optional(), // TODO: Add regex validation for phone number
    // TODO: Add more validation rules
  });

  const handleSubmit = async (values: IPatient, { setSubmitting }: any) => {
    try {
      if (values.id) {
        // TODO: Call patientService.updatePatient(values.id, values);
        console.log('Updating patient:', values);
      } else {
        // TODO: Call patientService.createPatient(values);
        console.log('Creating patient:', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save patient:', error);
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
          name="firstName"
          label="First Name"
          fullWidth
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          required
        />
        <TextField
          name="contactNumber"
          label="Contact Number"
          fullWidth
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          name="address"
          label="Address"
          fullWidth
          multiline
          rows={2}
        />
        {/* TODO: Add fields for medical history, allergies, insurance info */}
      </Box>
    </FormikForm>
  );
};

export default PatientForm;
