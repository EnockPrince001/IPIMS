// src/scenes/InventoryManagement/WasteManagement.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const WasteManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Waste Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Record and manage expired, damaged, or otherwise wasted inventory.
      </Typography>
      {/* TODO: Implement form for recording waste (product, quantity, reason, date) */}
      {/* TODO: Implement GenericDataGrid to view waste history */}
    </Box>
  );
};

export default WasteManagement;
