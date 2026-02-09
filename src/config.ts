// src/config.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// TODO: Define your GraphQL API endpoints here.
// These should ideally come from environment variables.
const USER_MANAGEMENT_API_URI = 'http://localhost:4001/graphql';
const ROLE_MANAGEMENT_API_URI = 'http://localhost:4002/graphql';
const INVENTORY_API_URI = 'http://localhost:4003/graphql';
const SALES_API_URI = 'http://localhost:4004/graphql';
const PATIENT_API_URI = 'http://localhost:4005/graphql';
const PRESCRIPTION_API_URI = 'http://localhost:4006/graphql';
const SETUP_API_URI = 'http://localhost:4007/graphql';

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
export const API_BASE_URL = "http://localhost:5000/api"; // Example for REST endpoints