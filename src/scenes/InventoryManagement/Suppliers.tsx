// src/scenes/InventoryManagement/Suppliers.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Suppliers: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Suppliers Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage pharmacy suppliers and their contact information.
      </Typography>
      {/* TODO: Implement GenericDataGrid for suppliers with CRUD operations */}
    </Box>
  );
};

export default Suppliers;
