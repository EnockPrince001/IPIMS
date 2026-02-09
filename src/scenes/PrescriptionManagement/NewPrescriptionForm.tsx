// src/scenes/PrescriptionManagement/NewPrescriptionForm.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import PatientSearchInput from '../../components/pharmacy/PatientSearchInput';
import DrugSearchInput from '../../components/pharmacy/DrugSearchInput';

const NewPrescriptionForm: React.FC = () => {
  // TODO: Implement form for manually entering a new prescription
  // TODO: Fields for Patient, Prescribing Doctor, Prescription Date, Expiry Date
  // TODO: Dynamic addition of drug items with quantity, dosage, instructions
  // TODO: Validation and submission logic

  const handlePatientSelect = (patientId: string) => {
    console.log('Selected patient:', patientId);
    // TODO: Load patient details
  };

  const handleDrugSelect = (drugId: string) => {
    console.log('Selected drug:', drugId);
    // TODO: Load drug details and add to prescription item list
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        New Prescription
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manually add or edit prescription details.
      </Typography>
      <PatientSearchInput value="" onChange={() => {}} />
      <DrugSearchInput value="" onChange={() => {}} />
      {/* TODO: Add actual form fields for prescription details and drug items */}
    </Box>
  );
};

export default NewPrescriptionForm;
