// src/components/pharmacy/ExpiryDateInput.tsx
import React from 'react';
import { TextField } from '@mui/material';
// import { DatePicker } from '@mui/lab'; // TODO: Integrate MUI X DatePicker if available

interface ExpiryDateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
}

const ExpiryDateInput: React.FC<ExpiryDateInputProps> = ({ value, onChange, label = 'Expiry Date' }) => {
  return (
    // TODO: Replace with MUI X DatePicker for better UX
    <TextField
      label={label}
      type="date"
      fullWidth
      InputLabelProps={{ shrink: true }}
      value={value ? value.toISOString().split('T')[0] : ''} // Format for input type="date"
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
    />
  );
};

export default ExpiryDateInput;
