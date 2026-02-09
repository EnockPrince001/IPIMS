// src/components/pharmacy/PrescriptionDetailsCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { IPrescription } from '../../data/models'; // Assuming Prescription model

interface PrescriptionDetailsCardProps {
  prescription: IPrescription;
}

const PrescriptionDetailsCard: React.FC<PrescriptionDetailsCardProps> = ({ prescription }) => {
  return (
    <Card sx={{ maxWidth: 600, bgcolor: 'background.paper', borderRadius: 2 }} elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Prescription #{prescription.id}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">Patient:</Typography>
          <Typography variant="body1">{prescription.patientName}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">Prescribing Doctor:</Typography>
          <Typography variant="body1">{prescription.prescribingDoctor}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">Date Prescribed:</Typography>
          <Typography variant="body1">{new Date(prescription.prescriptionDate).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Expires On:</Typography>
          <Typography variant="body1">{new Date(prescription.expiryDate).toLocaleDateString()}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle1" gutterBottom>
          Medications:
        </Typography>
        {prescription.drugItems.map((item, index) => (
          <Box key={index} sx={{ ml: 2, mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">{item.drugName}</Typography>
            <Typography variant="body2" color="text.secondary">
              Qty: {item.quantity}, Dosage: {item.dosage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructions: {item.instructions}
            </Typography>
            <Typography variant="caption" sx={{ color: item.isDispensed ? 'success.main' : 'warning.main' }}>
              {item.isDispensed ? 'Dispensed' : 'Pending'}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrescriptionDetailsCard;
