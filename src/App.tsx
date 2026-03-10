// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { useMode, ColorModeContext } from './theme';
import { ApolloProvider } from '@apollo/client/react';
import { userManagementClient, roleManagementClient, inventoryClient, salesClient, patientClient, prescriptionClient, setupClient } from './config';
import { AbilityContext } from './data/RBAC/ability';
import { useAuth } from './hooks/useAuth';

// HOC for authenticated layout
import withAuthLayout from './components/hoc/withAuthLayout';

// Public Scenes
import LandingPage from './scenes/Auth/LandingPage';
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

// Use custom auth hook
function useAppAuth(): { isSignedIn: boolean; isLoaded: boolean } {
  const { isAuthenticated, loading } = useAuth();
  return { isSignedIn: isAuthenticated, isLoaded: !loading };
}

// Pre-create protected layout wrappers
const ProtectedUsersTable = withAuthLayout(UsersTable);
const ProtectedRolesTable = withAuthLayout(RolesTable);
const ProtectedProductsTable = withAuthLayout(ProductsTable);
const ProtectedDispensePOS = withAuthLayout(DispensePOS);
const ProtectedSalesTransactions = withAuthLayout(SalesTransactions);
const ProtectedPatientsTable = withAuthLayout(PatientsTable);
const ProtectedPendingPrescriptions = withAuthLayout(PendingPrescriptions);
const ProtectedPharmacyDetails = withAuthLayout(PharmacyDetails);
const ProtectedDashboard = withAuthLayout(Dashboard);
const ProtectedSalesReports = withAuthLayout(SalesReports);

const AppContent: React.FC = () => {
  const { isSignedIn, isLoaded } = useAppAuth();
  const { ability } = useSelector((state: RootState) => state.roles);
  const [theme, colorMode] = useMode();

  if (!isLoaded) {
    return <div>Loading Application...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* @ts-expect-error - ability type mismatch from casl setup */}
        <AbilityContext.Provider value={ability}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />

            {/* Protected Routes */}
            {isSignedIn ? (
              <>
                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={userManagementClient}>
                      <Routes>
                        <Route path="/users" element={<ProtectedUsersTable />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={roleManagementClient}>
                      <Routes>
                        <Route path="/roles" element={<ProtectedRolesTable />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={inventoryClient}>
                      <Routes>
                        <Route path="/inventory/products" element={<ProtectedProductsTable />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={salesClient}>
                      <Routes>
                        <Route path="/pos/dispense" element={<ProtectedDispensePOS />} />
                        <Route path="/pos/transactions" element={<ProtectedSalesTransactions />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={patientClient}>
                      <Routes>
                        <Route path="/patients" element={<ProtectedPatientsTable />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={prescriptionClient}>
                      <Routes>
                        <Route path="/prescriptions/pending" element={<ProtectedPendingPrescriptions />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route
                  path="/*"
                  element={
                    <ApolloProvider client={setupClient}>
                      <Routes>
                        <Route path="/setup/pharmacy-details" element={<ProtectedPharmacyDetails />} />
                      </Routes>
                    </ApolloProvider>
                  }
                />

                <Route path="/dashboard" element={<ProtectedDashboard />} />
                <Route path="/reports/sales" element={<ProtectedSalesReports />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </AbilityContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
