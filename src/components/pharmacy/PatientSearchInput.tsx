// src/components/pharmacy/PatientSearchInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface PatientSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  // TODO: Add props for autocomplete options, debounce, etc.
}

const PatientSearchInput: React.FC<PatientSearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      label="Search Patient"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // TODO: Implement actual autocomplete / API fetching
    />
  );
};

export default PatientSearchInput;
