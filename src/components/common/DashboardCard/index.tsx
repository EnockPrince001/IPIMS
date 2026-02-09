// src/components/common/DashboardCard/index.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { IconProps } from '@mui/material/Icon';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType<IconProps>; // MUI Icon component
  // TODO: Add color, background, onClick, etc.
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <Card sx={{ minWidth: 275, bgcolor: 'background.paper', borderRadius: 2 }} elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
          {Icon && <Icon sx={{ fontSize: 40, color: 'primary.main' }} />}
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
        {/* TODO: Add trend indicator or subtitle */}
        <Typography variant="body2" color="text.secondary">
          {/* Some additional info */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
