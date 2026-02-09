// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useMode, ColorModeContext } from './theme';
import { ApolloProvider } from '@apollo/client';
import { userManagementClient, roleManagementClient, inventoryClient, salesClient, patientClient, prescriptionClient, setupClient } from './config';
import { AbilityContext } from './data/RBAC/ability';
import { useAuth } from './hooks/useAuth';

// HOC for authenticated layout
import withAuthLayout from './components/hoc/withAuthLayout';

// Public Scenes
import LoginPage from './scenes/Auth/LoginPage';

// Authenticated Scenes
import Dashboard from './scenes/Dashboard/Overview';
import DispensePOS from './scenes/POS/Dispense';
import ProductsTable from './scenes/InventoryManagement/ProductsTable';
import PatientsTable from './scenes/PatientManagement/PatientsTable';
import PendingPrescriptions from './scenes/PrescriptionManagement/PendingPrescriptions';
import SalesTransactions from './scenes/POS/Transactions';
import UsersTable from './scenes/UserManagement/UsersTable';
import RolesTable from './scenes/RoleManagement/RolesTable';
import SalesReports from './scenes/Reporting/SalesReports';
import PharmacyDetails from './scenes/SetupManagement/PharmacyDetails';

// A component to manage Apollo Providers based on routes
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading: authLoading, checkAuthStatus } = useAuth();
  const { ability } = useSelector((state: RootState) => state.roles);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    // Check auth status on mount and potentially periodically
    checkAuthStatus();
    // TODO: Implement inactivity timer if needed
  }, [checkAuthStatus]);

  if (authLoading) {
    // TODO: Render a global loading spinner
    return <div>Loading Application...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AbilityContext.Provider value={ability}>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} /> {/* Redirect to dashboard if authenticated */}

              {/* Protected Routes - ApolloProvider for each microservice */}
              {isAuthenticated ? (
                <>
                  {/* User Management Module */}
                  <Route
                    path="/*" // Catch all authenticated routes for user management
                    element={
                      <ApolloProvider client={userManagementClient}>
                        <Routes>
                          <Route path="/users" element={withAuthLayout(UsersTable)()} />
                          {/* TODO: Add more user management routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Role Management Module */}
                  <Route
                    path="/*" // Catch all authenticated routes for role management
                    element={
                      <ApolloProvider client={roleManagementClient}>
                        <Routes>
                          <Route path="/roles" element={withAuthLayout(RolesTable)()} />
                          {/* TODO: Add more role management routes like /permissions, /audits */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Inventory Management Module */}
                  <Route
                    path="/*"
                    element={
                      <ApolloProvider client={inventoryClient}>
                        <Routes>
                          <Route path="/inventory/products" element={withAuthLayout(ProductsTable)()} />
                          {/* TODO: Add more inventory routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Sales & POS Module */}
                  <Route
                    path="/*"
                    element={
                      <ApolloProvider client={salesClient}>
                        <Routes>
                          <Route path="/pos/dispense" element={withAuthLayout(DispensePOS)()} />
                          <Route path="/pos/transactions" element={withAuthLayout(SalesTransactions)()} />
                          {/* TODO: Add more POS/Sales routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Patient Management Module */}
                  <Route
                    path="/*"
                    element={
                      <ApolloProvider client={patientClient}>
                        <Routes>
                          <Route path="/patients" element={withAuthLayout(PatientsTable)()} />
                          {/* TODO: Add more patient management routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Prescription Management Module */}
                  <Route
                    path="/*"
                    element={
                      <ApolloProvider client={prescriptionClient}>
                        <Routes>
                          <Route path="/prescriptions/pending" element={withAuthLayout(PendingPrescriptions)()} />
                          {/* TODO: Add more prescription routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* Setup Management Module */}
                  <Route
                    path="/*"
                    element={
                      <ApolloProvider client={setupClient}>
                        <Routes>
                          <Route path="/setup/pharmacy-details" element={withAuthLayout(PharmacyDetails)()} />
                          {/* TODO: Add more setup routes */}
                        </Routes>
                      </ApolloProvider>
                    }
                  />

                  {/* General Application Routes (can use any client if shared or fetch locally) */}
                  <Route path="/dashboard" element={withAuthLayout(Dashboard)()} />
                  <Route path="/reports/sales" element={withAuthLayout(SalesReports)()} />
                  {/* TODO: Add other general routes */}

                  {/* Fallback for authenticated users */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              ) : (
                // Redirect unauthenticated users to login for any protected route
                <Route path="*" element={<Navigate to="/signin" replace />} />
              )}
            </Routes>
          </Router>
        </AbilityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

function App() {
  return <AppProviders />;
}

export default App;