// src/scenes/POS/Transactions.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { ISaleOrder } from '../../data/models';
import { salesService } from '../../services';
import { GridColDef } from '@mui/x-data-grid';

const SalesTransactions: React.FC = () => {
  const [transactions, setTransactions] = React.useState<ISaleOrder[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await salesService.getSaleOrders();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const columns: GridColDef[] = [
    { field: 'transactionDate', headerName: 'Date', width: 150 },
    { field: 'customerName', headerName: 'Customer', flex: 1 },
    { field: 'totalAmount', headerName: 'Total', type: 'number', width: 120 },
    { field: 'paymentStatus', headerName: 'Status', width: 120 },
    { field: 'cashierId', headerName: 'Cashier', width: 150 },
    // TODO: Add more transaction specific columns
  ];

  const actions = [
    {
      key: 'VIEW',
      button_name: 'View Details',
      Show_Button: true,
      permission: 'read',
      entity: 'SaleOrder',
      onClick: (row: ISaleOrder) => {
        // TODO: Open a modal or navigate to transaction details page
        console.log('Viewing transaction:', row.id);
      },
    },
    {
      key: 'REFUND',
      button_name: 'Process Refund',
      Show_Button: true,
      permission: 'refund', // Custom permission
      entity: 'SaleOrder',
      onClick: (row: ISaleOrder) => {
        // TODO: Implement refund process
        console.log('Processing refund for:', row.id);
      },
    },
    // TODO: Add other actions like 'Print Receipt', 'Reverse Transaction'
  ];

  if (loading) return <Typography>Loading sales transactions...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <GenericDataGrid
        title="Sales Transactions"
        subtitle="View and manage all past sales orders."
        data={transactions}
        columns={columns}
        actions={actions}
        onRefresh={fetchTransactions}
        // TODO: Add FormComponent for a potential new sales order from here, or for editing existing ones
      />
    </Box>
  );
};

export default SalesTransactions;
