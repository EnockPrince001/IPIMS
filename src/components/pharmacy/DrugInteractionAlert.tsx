// src/components/pharmacy/DrugInteractionAlert.tsx
import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

interface DrugInteractionAlertProps {
  drugA: string;
  drugB: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  // TODO: Add patient context for more personalized alerts
}

const DrugInteractionAlert: React.FC<DrugInteractionAlertProps> = ({ drugA, drugB, severity, description }) => {
  const alertSeverity = severity === 'high' ? 'error' : severity === 'medium' ? 'warning' : 'info';

  return (
    <Box sx={{ my: 2 }}>
      <Alert severity={alertSeverity}>
        <AlertTitle>Drug Interaction Warning: {drugA} + {drugB}</AlertTitle>
        {description}
        {/* TODO: Add more details or actions, e.g., override option */}
      </Alert>
    </Box>
  );
};

export default DrugInteractionAlert;
