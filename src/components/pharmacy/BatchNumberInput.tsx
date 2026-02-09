// src/components/pharmacy/BatchNumberInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface BatchNumberInputProps {
  value: string;
  onChange: (batchNumber: string) => void;
  label?: string;
  // TODO: Add validation, autocomplete for existing batches
}

const BatchNumberInput: React.FC<BatchNumberInputProps> = ({ value, onChange, label = 'Batch Number' }) => {
  return (
    <TextField
      label={label}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
    />
  );
};

export default BatchNumberInput;
