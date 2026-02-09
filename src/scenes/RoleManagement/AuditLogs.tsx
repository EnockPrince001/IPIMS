// src/scenes/RoleManagement/AuditLogs.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const AuditLogs: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Review a detailed history of user actions and system changes.
      </Typography>
      {/* TODO: Implement GenericDataGrid for audit logs (read-only) */}
    </Box>
  );
};

export default AuditLogs;
