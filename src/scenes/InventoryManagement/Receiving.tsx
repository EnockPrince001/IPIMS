// src/scenes/InventoryManagement/Receiving.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ExpiryDateInput from '../../components/pharmacy/ExpiryDateInput';
import BatchNumberInput from '../../components/pharmacy/BatchNumberInput';

const Receiving: React.FC = () => {
  // TODO: Implement form for receiving new stock
  // TODO: Allow searching for products, entering quantities, batch numbers, expiry dates
  // TODO: Integrate with inventoryService to update stock levels
  const handleExpiryDateChange = (date: Date | null) => {
    console.log('Expiry Date:', date);
  };

  const handleBatchNumberChange = (batch: string) => {
    console.log('Batch Number:', batch);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stock Receiving
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Process incoming inventory from suppliers.
      </Typography>
      {/* TODO: Add search for product, quantity input */}
      <ExpiryDateInput value={null} onChange={handleExpiryDateChange} />
      <BatchNumberInput value="" onChange={handleBatchNumberChange} />
    </Box>
  );
};

export default Receiving;
