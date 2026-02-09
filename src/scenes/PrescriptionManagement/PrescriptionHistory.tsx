// src/scenes/PrescriptionManagement/PrescriptionHistory.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const PrescriptionHistory: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Prescription History
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse historical records of dispensed and managed prescriptions.
      </Typography>
      {/* TODO: Implement GenericDataGrid for all prescriptions, with advanced filtering */}
      {/* TODO: Link to patient details and drug details */}
    </Box>
  );
};

export default PrescriptionHistory;
