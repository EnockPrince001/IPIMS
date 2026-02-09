// src/components/pharmacy/DrugSearchInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface DrugSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  // TODO: Add props for autocomplete options, debounce, etc.
}

const DrugSearchInput: React.FC<DrugSearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      label="Search Drug"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // TODO: Implement actual autocomplete / API fetching
    />
  );
};

export default DrugSearchInput;
