// src/scenes/PatientManagement/PatientsTable.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { IPatient } from '../../data/models';
import { patientService } from '../../services';
import PatientForm from './PatientForm'; // Assuming a form for patients

const PatientsTable: React.FC = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'dateOfBirth', headerName: 'DOB', width: 120 },
    // TODO: Add more columns as needed
  ];

  const actions = [
    {
      key: 'ADD',
      button_name: 'Add Patient',
      Show_Button: true,
      permission: 'create',
      entity: 'Patient',
    },
    {
      key: 'EDIT',
      button_name: 'Edit Patient',
      Show_Button: true,
      permission: 'update',
      entity: 'Patient',
    },
    {
      key: 'VIEW_PRESCRIPTIONS',
      button_name: 'View Prescriptions',
      Show_Button: true,
      permission: 'read',
      entity: 'Prescription', // Can read prescriptions related to this patient
      onClick: (row: IPatient) => {
        // TODO: Navigate to patient's prescription history
        console.log('Viewing prescriptions for patient:', row.firstName);
      },
    },
  ];

  if (loading) return <Typography>Loading patients...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <GenericDataGrid
      title="Patients"
      subtitle="Manage patient records and view medical history."
      data={patients}
      columns={columns}
      actions={actions}
      FormComponent={PatientForm}
      onRefresh={fetchPatients}
    />
  );
};

export default PatientsTable;
