// src/scenes/Dashboard/Overview.tsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DashboardCard from '../../components/common/DashboardCard'; // Assuming DashboardCard exists
import { APP_NAME } from '../../config';

const DashboardOverview: React.FC = () => {
  // TODO: Fetch dashboard data (sales stats, inventory alerts, etc.)
  // using salesService, inventoryService etc.
  const salesToday = 12500.75;
  const pendingPrescriptions = 15;
  const lowStockItems = 7;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to {APP_NAME} Dashboard!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Quick overview of key pharmacy metrics.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* TODO: Implement DashboardCard component with actual data */}
          {/* <DashboardCard title="Sales Today" value={`KSh ${salesToday.toLocaleString()}`} icon="AttachMoneyIcon" /> */}
          <Box sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h6">Sales Today: KSh {salesToday.toLocaleString()}</Typography>
            <Typography variant="body2">Placeholder Card</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h6">Pending Prescriptions: {pendingPrescriptions}</Typography>
            <Typography variant="body2">Placeholder Card</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h6">Low Stock Items: {lowStockItems}</Typography>
            <Typography variant="body2">Placeholder Card</Typography>
          </Box>
        </Grid>
        {/* TODO: Add charts and more detailed reports */}
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
