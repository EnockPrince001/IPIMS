// src/components/pharmacy/DispensingItemRow.tsx
import React from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPharmacyProduct } from '../../data/models'; // Assuming product model

interface DispensingItemRowProps {
  item: {
    product: IPharmacyProduct;
    quantity: number;
    // TODO: Add other dispensing-specific fields like batch, expiry, price adjustments
  };
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  // TODO: Add props for price override, batch selection, etc.
}

const DispensingItemRow: React.FC<DispensingItemRowProps> = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onQuantityChange(item.product.id, newQuantity);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderBottom: '1px solid #eee' }}>
      <Typography sx={{ flexGrow: 1 }}>{item.product.name}</Typography>
      <TextField
        type="number"
        label="Qty"
        variant="outlined"
        size="small"
        value={item.quantity}
        onChange={handleQuantityChange}
        sx={{ width: 80 }}
      />
      <Typography sx={{ width: 80, textAlign: 'right' }}>
        KSh {(item.product.unitPrice * item.quantity).toFixed(2)}
      </Typography>
      <IconButton onClick={() => onRemove(item.product.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default DispensingItemRow;
