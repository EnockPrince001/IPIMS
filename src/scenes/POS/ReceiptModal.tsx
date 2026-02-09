// src/scenes/POS/ReceiptModal.tsx
import React, { useRef } from 'react';
import { Box, Typography, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ModalWrapper from '../../components/common/ModalWrapper';
import { ISaleOrderItem, IPatient } from '../../data/models';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { APP_NAME } from '../../config';

interface ReceiptModalProps {
  open: boolean;
  onClose: () => void;
  saleDetails: {
    patient: IPatient | null;
    items: ISaleOrderItem[];
    totals: {
      subtotal: number;
      taxAmount: number;
      grandTotal: number;
    };
    payment: {
      method: string;
      amountPaid: number;
    };
  } | null;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ open, onClose, saleDetails }) => {
  const componentRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!saleDetails) {
    return null; // Don't render if there are no details
  }
  
  const { patient, items, totals, payment } = saleDetails;
  const transactionId = `TXN-${Date.now()}`; // Mock transaction ID
  const changeDue = payment.amountPaid - totals.grandTotal;

  return (
    <ModalWrapper open={open} onClose={onClose} title="Sale Completed - Receipt" maxWidth="sm">
      <Box ref={componentRef} sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">{APP_NAME}</Typography>
          {/* TODO: Fetch and display actual pharmacy address/contact from config */}
          <Typography variant="body2">123 Main St, Nakuru, Kenya</Typography>
          <Typography variant="body2">Tel: 0712 345 678</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Transaction ID: {transactionId}</Typography>
          <Typography variant="body2">Date: {new Date().toLocaleString()}</Typography>
        </Box>
        {patient && (
          <Typography variant="body2">Patient: {patient.firstName} {patient.lastName}</Typography>
        )}
        {/* TODO: Add cashier name */}
        <Typography variant="body2">Cashier: Pharmacist</Typography>
        
        <TableContainer component={Paper} elevation={0} sx={{ my: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell align="right">{item.totalPrice.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal:</Typography>
            <Typography>KSh {totals.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>VAT (16%):</Typography>
            <Typography>KSh {totals.taxAmount.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">Grand Total:</Typography>
            <Typography fontWeight="bold">KSh {totals.grandTotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Paid ({payment.method}):</Typography>
            <Typography>KSh {payment.amountPaid.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Change Due:</Typography>
            <Typography>KSh {changeDue.toFixed(2)}</Typography>
          </Box>
        </Box>

        <Typography variant="caption" display="block" sx={{ textAlign: 'center', mt: 4 }}>
          Thank you for your business!
        </Typography>
      </Box>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
          Print
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default ReceiptModal;
