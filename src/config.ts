import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    ApolloLink,
    RequestHandler,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"; // Correct import for v3+

export const base_url = "https://api.njumu.pos.sababisha.com/posgateway";
// export const base_url = "https://uat.api.pos.sababisha.com/posgateway"; // UAT

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            // alert(`Graphql error ${message}`); // Optional: keep or remove alert
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return {};
    }
    // Remove extra quotes if present
    const formattedToken = `Bearer ${token.replace(/"/g, "")}`;
    return {
        Authorization: formattedToken,
    };
};

const authMiddleware = new ApolloLink((operation, forward) => {
    const headers = getAuthHeaders();
    operation.setContext({
        headers: {
            ...headers,
        },
    });
    return forward(operation);
});

// Client creators
export const createUsersClient = () => {
    const link = new HttpLink({ uri: `${base_url}/POSUser` });
    return new ApolloClient({
        link: onErrorLink.concat(authMiddleware).concat(link),
        cache: new InMemoryCache(),
    });
};

export const createRoleClient = () => {
    const link = new HttpLink({ uri: `${base_url}/POSRole` });
    return new ApolloClient({
        link: onErrorLink.concat(authMiddleware).concat(link),
        cache: new InMemoryCache(),
    });
};

export const createSetupClient = () => {
    const link = new HttpLink({ uri: `${base_url}/POSSetupManagement` });
    return new ApolloClient({
        link: onErrorLink.concat(authMiddleware).concat(link),
        cache: new InMemoryCache(),
    });
};

// URL Constants
export const loginUrl = {
    login: `${base_url}/POSUser/login`,
};

export const roleManagemenUrl = {
    uri: `${base_url}/POSRole`,
};

export const userManagementUrl = {
    uri: `${base_url}/POSUser`,
};

export const MCBSwitchService = {
    uri: `${base_url}/POSUser/mcbswitch`,
};

export const companyManagementUrl = {
    uri: `${base_url}/POSCompanyManagement`,
    upload_logo_uri: `${base_url}/POSCompanyManagement/UploadLogo`,
};

export const smsservice = {
    uri: `${base_url}/POSSMS`,
};

export const customerservice = {
    uri: `${base_url}/POSCustomer`,
};

export const emailService = {
    uri: `${base_url}/POSemailservice`,
};

export const STKPushAttempt = {
    uri: `${base_url}/STKPushAttempt`,
};

export const RequestUnlockOTP = {
    uri: `${base_url}/POSUser/requestunlockotp`,
};

export const VerifyUnlockOTP = {
    uri: `${base_url}/POSUser/verifyunlockotp`,
};

export const AccountsandFinanceurl = {
    uri: `${base_url}/POSaccountsmanagement`,
};

export const ForgetPasswordApiService = {
    uri: `${base_url}/POSUser/forgotpassword`,
};

export const setupManagementUrl = {
    uri: `${base_url}/POSSetupManagement`,
};

export const inventoryManagementUrl = {
    uri: `${base_url}/posinventory`,
};

export const documentManagementUrl = {
    uri: `${base_url}/POSdocumentmanagement`,
    baseFilePath: `${base_url}/POSdocumentmanagement/ReadDocument?`,
};

export const salesManagement = {
    uri: `${base_url}/POSsale`,
};

export const notificationservice = {
    uri: `${base_url}/POSNotifications`,
};

export const reportsManagementUrl = {
    uri: `${base_url}/POSReports`,
    generate_report_uri: `${base_url}/mcbposengine/generateReport`,
};

// Direct URI Exports for convenience
export const accountAndFinanceUri = AccountsandFinanceurl.uri;
export const inventoryManagementUri = inventoryManagementUrl.uri;
export const userManagementUri = userManagementUrl.uri;
export const salesManagementUri = salesManagement.uri;

const AppConfig = {
    // Add specific exports if needed, though usually named exports are used
};

export default AppConfig;
