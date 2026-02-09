// src/scenes/Reporting/InventoryReports.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const InventoryReports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inventory Reports
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Analyze inventory performance, stock movement, and expiry trends.
      </Typography>
      {/* TODO: Implement filtering options (product, category, supplier, date range) */}
      {/* TODO: Reports like low stock, expired items, stock turnover */}
    </Box>
  );
};

export default InventoryReports;
