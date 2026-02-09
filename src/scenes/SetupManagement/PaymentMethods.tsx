// src/scenes/SetupManagement/PaymentMethods.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentMethods: React.FC = () => {
  // TODO: Implement GenericDataGrid for managing payment methods
  // TODO: Actions for Add, Edit, Activate/Deactivate payment methods
  // TODO: Integrate with setupService to fetch/update payment methods
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configure accepted payment methods (cash, card, mobile money, etc.).
      </Typography>
    </Box>
  );
};

export default PaymentMethods;
