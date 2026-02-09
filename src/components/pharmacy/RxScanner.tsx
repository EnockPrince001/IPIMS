// src/components/pharmacy/RxScanner.tsx
import React from 'react';
import { Button } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

interface RxScannerProps {
  onScan: (data: string) => void;
  // TODO: Add props for camera selection, error handling, etc.
}

const RxScanner: React.FC<RxScannerProps> = ({ onScan }) => {
  const handleScan = () => {
    // TODO: Implement actual barcode/QR code scanning logic (e.g., using a library or webcam)
    console.log('Simulating scan...');
    onScan('MOCK_PRESCRIPTION_QR_CODE_DATA');
  };

  return (
    <Button
      variant="outlined"
      startIcon={<QrCodeScannerIcon />}
      onClick={handleScan}
    >
      Scan Prescription
    </Button>
  );
};

export default RxScanner;
