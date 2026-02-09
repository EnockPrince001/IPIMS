// src/components/common/ChartContainer/index.tsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: string | number;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, subtitle, children, height = 300 }) => {
  return (
    <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{subtitle}</Typography>}
      <Box sx={{ height: height, width: '100%' }}>
        {children}
      </Box>
    </Paper>
  );
};

export default ChartContainer;
