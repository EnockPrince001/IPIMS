// src/scenes/POS/Suspended.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { ISaleOrder } from '../../data/models';
import { salesService } from '../../services';
import { GridColDef } from '@mui/x-data-grid';

const SuspendedTransactions: React.FC = () => {
  const [suspendedOrders, setSuspendedOrders] = React.useState<ISaleOrder[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSuspendedOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: salesService needs a method to specifically get suspended orders
      const allOrders = await salesService.getSaleOrders();
      setSuspendedOrders(allOrders.filter(order => order.isSuspended));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch suspended orders');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSuspendedOrders();
  }, []);

  const columns: GridColDef[] = [
    { field: 'transactionDate', headerName: 'Date', width: 150 },
    { field: 'customerName', headerName: 'Customer', flex: 1 },
    { field: 'totalAmount', headerName: 'Total', type: 'number', width: 120 },
    { field: 'cashierId', headerName: 'Suspended By', width: 150 },
    // TODO: Add more relevant columns for suspended orders
  ];

  const actions = [
    {
      key: 'RESUME',
      button_name: 'Resume Order',
      Show_Button: true,
      permission: 'resume', // Custom permission
      entity: 'SaleOrder',
      onClick: (row: ISaleOrder) => {
        // TODO: Implement logic to resume order and navigate to POS/Dispense screen
        console.log('Resuming order:', row.id);
      },
    },
    {
      key: 'DELETE',
      button_name: 'Delete Order',
      Show_Button: true,
      permission: 'delete',
      entity: 'SaleOrder',
      onClick: (row: ISaleOrder) => {
        // TODO: Implement logic to delete suspended order
        console.log('Deleting suspended order:', row.id);
      },
    },
  ];

  if (loading) return <Typography>Loading suspended orders...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <GenericDataGrid
        title="Suspended Orders"
        subtitle="Manage sales orders that were saved and suspended."
        data={suspendedOrders}
        columns={columns}
        actions={actions}
        onRefresh={fetchSuspendedOrders}
      />
    </Box>
  );
};

export default SuspendedTransactions;
