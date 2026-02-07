import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ApolloProvider } from "@apollo/client";

// Apollo Clients
import {
  createRoleClient,
  createSetupClient,
  createUsersClient,
} from "./config";

// Components & Scenes
import LandingPage from "./pages/Global/LandingPage";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/InventoryManagement";
import Sales from "./pages/SalesManagement";
import Customers from "./pages/CustomerManagement";
import Finance from "./pages/FinanceManagement";
import Users from "./pages/UserManagement";
import Reports from "./pages/ReportsManagement";
import Setup from "./pages/SetupManagement";
import withLayout from "./components/HOCApp";

// Authentication Placeholder
const SignInSide = ({ onLogin }: { onLogin: () => void }) => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="p-8 space-y-4 rounded-lg shadow-lg bg-card border border-border w-96">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">IP</div>
      </div>
      <h1 className="text-2xl font-bold text-center text-foreground tracking-tight">IPIMS Login</h1>
      <p className="text-muted-foreground text-center text-sm">Intelligent Pharmacy Inventory System</p>
      <div className="space-y-4 pt-4">
        <button
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-semibold shadow-md active:scale-[0.98]"
          onClick={() => { localStorage.setItem("token", "mock-token"); onLogin(); }}
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  </div>
);

const ProfilePage = () => <div className="p-4"><h1>User Profile</h1><p>Profile Details</p></div>;

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const userClient = createUsersClient();

  // Basic Auth Sync
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) return <Navigate to="/signin" replace />;
    return <>{children}</>;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInSide onLogin={() => { setIsAuthenticated(true); navigate("/super-admin-dashboard"); }} />} />

          {/* Protected Routes Wrapper */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="/super-admin-dashboard" element={withLayout(Dashboard)({})} />

                {/* 1. Inventory Management */}
                <Route path="/product" element={withLayout(Inventory)({})} />
                <Route path="/expired-products" element={withLayout(Inventory)({})} />

                {/* 3. Sales Management */}
                <Route path="/pos" element={withLayout(Sales)({})} />
                <Route path="/pos-salesorders" element={withLayout(Sales)({})} />

                {/* 4. Customer Management */}
                <Route path="/customers" element={withLayout(Customers)({})} />

                {/* 5. Accounts and Finance */}
                <Route path="/chart-of-accounts" element={withLayout(Finance)({})} />
                <Route path="/accounts-setups" element={withLayout(Finance)({})} />

                {/* 6. User Management */}
                <Route path="/users" element={withLayout(Users)({})} />

                {/* 7. Reports Management */}
                <Route path="/report-browser" element={withLayout(Reports)({})} />
                <Route path="/reports-major-classification" element={withLayout(Reports)({})} />

                {/* 8. Role Management */}
                <Route path="/role" element={withLayout(Users)({})} />
                <Route path="/rights" element={withLayout(Users)({})} />

                {/* 9. Setup & 10. Company */}
                <Route path="/pos-setups" element={withLayout(Setup)({})} />
                <Route path="/manage-companies" element={withLayout(Setup)({})} />

                <Route path="/profile" element={withLayout(ProfilePage)({})} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/super-admin-dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
