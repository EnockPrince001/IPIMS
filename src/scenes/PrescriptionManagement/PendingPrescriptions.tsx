// src/scenes/PrescriptionManagement/PendingPrescriptions.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { IPrescription } from '../../data/models';
import { prescriptionService } from '../../services';

const PendingPrescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingPrescriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch prescriptions with 'pending' status
      const data = await prescriptionService.getPrescriptions('pending');
      setPrescriptions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pending prescriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPrescriptions();
  }, []);

  const columns: GridColDef[] = [
    { field: 'patientName', headerName: 'Patient', flex: 1 },
    { field: 'prescribingDoctor', headerName: 'Doctor', flex: 1 },
    { field: 'prescriptionDate', headerName: 'Prescribed On', width: 150 },
    { field: 'expiryDate', headerName: 'Expires On', width: 150 },
    // TODO: Add column for status and a summary of drugs
  ];

  const actions = [
    {
      key: 'DISPENSE',
      button_name: 'Dispense',
      Show_Button: true,
      permission: 'dispense', // Custom permission
      entity: 'Prescription',
      onClick: (row: IPrescription) => {
        // TODO: Navigate to POS/Dispense screen with this prescription pre-loaded
        console.log('Dispensing prescription:', row.id);
      },
    },
    {
      key: 'VIEW',
      button_name: 'View Details',
      Show_Button: true,
      permission: 'read',
      entity: 'Prescription',
      onClick: (row: IPrescription) => {
        // TODO: Open a modal or navigate to prescription details
        console.log('Viewing prescription details:', row.id);
      },
    },
  ];

  if (loading) return <Typography>Loading pending prescriptions...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <GenericDataGrid
      title="Pending Prescriptions"
      subtitle="View and manage prescriptions awaiting dispensing."
      data={prescriptions}
      columns={columns}
      actions={actions}
      onRefresh={fetchPendingPrescriptions}
    />
  );
};

export default PendingPrescriptions;
