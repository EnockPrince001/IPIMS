// src/components/hoc/withAuthLayout.tsx
import React from 'react';
import { Box, Toolbar, useTheme } from '@mui/material';
import Sidebar from './Sidebar'; // Assuming a Sidebar component exists
import Header from './Header';   // Assuming a Header component exists

// Define the type for the props of the wrapped component
type WrappedComponentProps = Record<string, any>; // Adjust as needed

// A simple HOC for applying the common authenticated layout
const withAuthLayout = (WrappedComponent: React.ComponentType<WrappedComponentProps>) => {
  const ComponentWithLayout: React.FC<WrappedComponentProps> = (props) => {
    const theme = useTheme();
    // TODO: Get sidebar open state from Redux ui slice
    const isSidebarOpen = true; // Placeholder

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
        {/* TODO: Implement Sidebar component */}
        {/* <Sidebar isOpen={isSidebarOpen} /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${isSidebarOpen ? '260px' : '60px'})`, // Adjust based on sidebar width
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ml: isSidebarOpen ? '260px' : '60px', // Adjust margin for sidebar
          }}
        >
          {/* TODO: Implement Header component */}
          {/* <Header /> */}
          <Toolbar /> {/* Spacer for the fixed header */}
          <WrappedComponent {...props} />
        </Box>
      </Box>
    );
  };
  return ComponentWithLayout;
};

export default withAuthLayout;
