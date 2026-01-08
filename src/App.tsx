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
import LandingPage from "./scenes/global/LandingPage";
import Users from "./scenes/users";
import Inventory from "./scenes/inventory";
import POS from "./scenes/pos";
import Suppliers from "./scenes/suppliers";
import Dashboard from "./scenes/dashboard";
import withLayout from "./components/HOCApp";

// Feature Placeholders (To be implemented later)
// import SignInSide from "./scenes/login/LoginPage";
// Using a temporary placeholder for Login to make it compile
const SignInSide = ({ onLogin }: { onLogin: () => void }) => (
  <div style={{ padding: 20 }}>
    <h1>Login Page</h1>
    <button onClick={() => { localStorage.setItem("token", "mock-token"); onLogin(); }}>Simulate Login</button>
  </div>
);

const ChangePasswordForm = () => <div>Change Password</div>;
const ForgotPasswordForm = () => <div>Forgot Password</div>;
const OTPVerification = () => <div>OTP Verification</div>;
const McbSwitch = () => <div>MCB Switch</div>;
const PersonDetails = () => <div>Profile Page</div>;

// Role Management Placeholders
const Modules = () => <div>Modules</div>;
const Rights = () => <div>Rights</div>;
const RoleGroups = () => <div>Role Groups</div>;
const Role = () => <div>Roles</div>;
const AssignRight = () => <div>Assign Rights</div>;
const SubRightTable = () => <div>Sub Rights</div>;

// Other placeholders can be added as files are created

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Apollo Clients
  const userManagementClient = createUsersClient();
  const roleManagementClient = createRoleClient();
  const setupManagementClient = createSetupClient();
  // const salesManagementClient = createSalesClient(); // To be implemented

  // Authentication & Inactivity Logic
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      // Basic check - in real app check expiry claim or dedicated storage
      if (!token) {
        if (
          location.pathname === "/forgot-password" ||
          location.pathname === "/" ||
          location.pathname === "/signin" ||
          location.pathname === "/otp-verification"
        ) {
          // Allowed public routes
        } else {
          setIsAuthenticated(false);
          // navigate("/signin"); // Uncomment to enforce redirect
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    checkTokenExpiration(); // Initial check

    return () => clearInterval(interval);
  }, [navigate, location.pathname]);

  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    let inactivityTimer: any;

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/signin");
      }, INACTIVITY_LIMIT);
    };

    const handleActivity = () => resetInactivityTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    resetInactivityTimer();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={userManagementClient}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/signin"
              element={<SignInSide onLogin={() => { setIsAuthenticated(true); navigate("/super-admin-dashboard"); }} />}
            />
            {/* Public Routes */}
            <Route path="/changepassword" element={<ChangePasswordForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/otp-verification" element={<OTPVerification />} />

            {/* Protected Routes using withLayout */}
            {isAuthenticated && (
              <>
                <Route path="/MCB-SWITCH" element={<McbSwitch />} />
                <Route path="/profile" element={withLayout(PersonDetails)({})} />

                {/* Core Pharmacy Modules */}
                <Route path="/users" element={withLayout(Users)({})} />
                <Route path="/inventory" element={withLayout(Inventory)({})} />
                <Route path="/pos" element={withLayout(POS)({})} />
                <Route path="/suppliers" element={withLayout(Suppliers)({})} />
              </>
            )}

            <Route
              path="/super-admin-dashboard"
              element={isAuthenticated ? withLayout(Dashboard)({}) : <Navigate to="/signin" />}
            />

          </Routes>

          {/* Nested Routes for Role Management (Using Role Client) */}
          {isAuthenticated && (
            <ApolloProvider client={roleManagementClient}>
              <Routes>
                <Route path="/module" element={withLayout(Modules)({})} />
                <Route path="/rights" element={withLayout(Rights)({})} />
                <Route path="/role-group" element={withLayout(RoleGroups)({})} />
                <Route path="/role" element={withLayout(Role)({})} />
                <Route path="/role-Rights" element={withLayout(AssignRight)({})} />
                <Route path="/subright" element={withLayout(SubRightTable)({})} />
              </Routes>
            </ApolloProvider>
          )}

          {/* Nested Routes for Users (Using User Client - already top level but repeated for clarity/structure mirroring) */}
          {isAuthenticated && (
            <ApolloProvider client={userManagementClient}>
              <Routes>
                <Route path="/users" element={withLayout(Users)({})} />
                <Route path="/usersform" element={withLayout(UsersForm)({})} />
              </Routes>
            </ApolloProvider>
          )}

          {/* Nested Routes for Setup (Using Setup Client) */}
          {isAuthenticated && (
            <ApolloProvider client={setupManagementClient}>
              <Routes>
                {/* Add Setup routes here */}
              </Routes>
            </ApolloProvider>
          )}

        </ApolloProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
