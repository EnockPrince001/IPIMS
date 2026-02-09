// src/scenes/POS/PaymentModal.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, CircularProgress, Alert } from '@mui/material';
import ModalWrapper from '../../components/common/ModalWrapper';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentDetails: { method: string; amountPaid: number }) => Promise<void>;
  totalAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onConfirm, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState<number | string>('');
  const [change, setChange] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset state when modal opens or totalAmount changes
    if (open) {
      setAmountPaid(totalAmount); // Pre-fill amount paid with total
      setChange(0);
      setError('');
    }
  }, [open, totalAmount]);
  
  useEffect(() => {
    // Calculate change dynamically
    const paid = typeof amountPaid === 'number' ? amountPaid : parseFloat(String(amountPaid));
    if (!isNaN(paid) && paid >= totalAmount) {
      setChange(paid - totalAmount);
    } else {
      setChange(0);
    }
  }, [amountPaid, totalAmount]);

  const handleConfirm = async () => {
    const paid = typeof amountPaid === 'number' ? amountPaid : parseFloat(String(amountPaid));
    if (isNaN(paid) || paid < totalAmount) {
      setError(`Amount paid must be at least KSh ${totalAmount.toFixed(2)}`);
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await onConfirm({ method: paymentMethod, amountPaid: paid });
      onClose(); // Close modal on success
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = ['Cash', 'MPesa', 'Card', 'Insurance'];

  return (
    <ModalWrapper open={open} onClose={onClose} title="Process Payment">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" color="text.secondary">Total Amount Due</Typography>
          <Typography variant="h3" fontWeight="bold" color="primary">
            KSh {totalAmount.toFixed(2)}
          </Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          select
          label="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          fullWidth
        >
          {paymentMethods.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Amount Paid"
          type="number"
          fullWidth
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>KSh</Typography>,
          }}
        />

        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle1" color="text.secondary">Change Due</Typography>
          <Typography variant="h5" fontWeight="bold">
            KSh {change.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default PaymentModal;
