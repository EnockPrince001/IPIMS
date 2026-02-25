// src/config.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// ============================================================================
// API Configuration
// ============================================================================
// Each service has TWO URL options:
//   1. Direct service URL  — for testing individual services directly
//   2. Gateway URL         — for routing through the Ocelot API Gateway
// Comment/uncomment as needed depending on your testing scenario.
// ============================================================================

// --- API Gateway base URL ---
const GATEWAY_BASE_URL = 'http://localhost:5073/api/gateway';

// --- Auth / User Management Service ---
// uri: "http://localhost:4001/graphql",  // Direct
const USER_MANAGEMENT_API_URI = `${GATEWAY_BASE_URL}/users/graphql`;

// --- Role Management Service ---
// uri: "http://localhost:4002/graphql",  // Direct
const ROLE_MANAGEMENT_API_URI = `${GATEWAY_BASE_URL}/users/graphql`;

// --- Inventory Service ---
// uri: "http://localhost:4003/graphql",  // Direct
const INVENTORY_API_URI = `${GATEWAY_BASE_URL}/inventory/graphql`;

// --- Sales Service ---
// uri: "http://localhost:4004/graphql",  // Direct
const SALES_API_URI = `${GATEWAY_BASE_URL}/dispensing/graphql`;

// --- Patient Service ---
// uri: "http://localhost:4005/graphql",  // Direct
const PATIENT_API_URI = `${GATEWAY_BASE_URL}/patients/graphql`;

// --- Prescription Service ---
// uri: "http://localhost:4006/graphql",  // Direct
const PRESCRIPTION_API_URI = `${GATEWAY_BASE_URL}/prescriptions/graphql`;

// --- Setup Service ---
// uri: "http://localhost:4007/graphql",  // Direct
const SETUP_API_URI = `${GATEWAY_BASE_URL}/drugs/graphql`;

const createApolloClient = (uri: string) => {
  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
    // TODO: Add authentication headers (e.g., JWT token) here
    // headers: {
    //   authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
    // },
  });
};

export const userManagementClient = createApolloClient(USER_MANAGEMENT_API_URI);
export const roleManagementClient = createApolloClient(ROLE_MANAGEMENT_API_URI);
export const inventoryClient = createApolloClient(INVENTORY_API_URI);
export const salesClient = createApolloClient(SALES_API_URI);
export const patientClient = createApolloClient(PATIENT_API_URI);
export const prescriptionClient = createApolloClient(PRESCRIPTION_API_URI);
export const setupClient = createApolloClient(SETUP_API_URI);

// Other environment variables or constants
export const APP_NAME = "IPIMS Pharmacy POS";
export const API_BASE_URL = `${GATEWAY_BASE_URL}`; // REST endpoints via gateway