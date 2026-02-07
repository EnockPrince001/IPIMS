import axios from "axios";

// Helper to get headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const formattedToken = token ? `Bearer ${token.replace(/"/g, "")}` : "";

    return {
        Authorization: formattedToken,
        "Content-Type": "application/json",
    };
};

export async function graphqlQuery(query: string, base_url: string, variables: any = {}) {
    try {
        const headers = getAuthHeaders();
        const postData = {
            query,
            variables,
        };

        const response = await axios.post(base_url, postData, { headers });

        // Safety check for response structure
        if (response.data && response.data.data) {
            const dataObject = Object.values(response.data.data)[0];
            return dataObject;
        } else if (response.data && response.data.errors) {
            throw new Error(response.data.errors[0].message);
        }
        return null;

    } catch (error) {
        console.error("❌ GraphQL Query Error:", error);
        throw error;
    }
}

export async function graphqlMutation(mutation: string, base_url: string) {
    try {
        const headers = getAuthHeaders();
        const postData = {
            query: mutation,
        };
        const response = await axios.post(base_url, postData, { headers });
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// Generators
export function generateQuery(queryName: string, modelName: string | null, inputFields: any, returnFields: string[]) {
    let query = `query { ${queryName}(`;

    if (Object.keys(inputFields).length > 0) {
        if (modelName) {
            query += `${modelName}: {`;
        }
        const inputEntries = Object.entries(inputFields);
        inputEntries.forEach(([key, value], index) => {
            query += `${key}: ${JSON.stringify(value)}`;
            if (index < inputEntries.length - 1) {
                query += ", ";
            }
        });
        if (modelName) query += `}`;
    }
    query += `)`;

    if (returnFields && returnFields.length > 0) {
        const returnFieldStrings = returnFields.join("\n");
        query += ` { ${returnFieldStrings} }`;
    }
    query += ` }`;

    return query;
}

export function generateQueryBalance(queryName: string, modelName: string | null, inputFields: any, returnFields: string[]) {
    // Similar to generateQuery but slightly different handling in original code (optional braces)
    // We will stick to the robust implementation
    return generateQuery(queryName, modelName, inputFields, returnFields);
}

export function generateMutationBalance(mutationName: string, modelName: string | null, inputFields: any, returnFields: string[]) {
    let mutation = `mutation { ${mutationName}(`;

    if (Object.keys(inputFields).length > 0) {
        if (modelName) {
            mutation += `${modelName}: {`;
        }
        const inputEntries = Object.entries(inputFields);
        inputEntries.forEach(([key, value], index) => {
            mutation += `${key}: ${JSON.stringify(value)}`;
            if (index < inputEntries.length - 1) {
                mutation += ", ";
            }
        });
        if (modelName) mutation += `}`;
    }
    mutation += `)`;

    if (returnFields && returnFields.length > 0) {
        const returnFieldStrings = returnFields.join("\n");
        mutation += ` { ${returnFieldStrings} }`;
    }
    mutation += ` }`;

    return mutation;
}

// Engine Functions
export async function fetchDataEngine(queryName: string, modelName: string | null, inputFields: any, returnFields: string[], baseurl: string) {
    try {
        const query = generateQuery(queryName, modelName, inputFields, returnFields);
        const data = await graphqlQuery(query, baseurl);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function fetchDataEngineBalance(queryName: string, modelName: string | null, inputFields: any, returnFields: string[], baseurl: string) {
    const query = generateQueryBalance(queryName, modelName, inputFields, returnFields);
    return await graphqlQuery(query, baseurl);
}

export async function mutateDataEngineBalance(mutationName: string, modelName: string | null, inputFields: any, returnFields: string[], baseurl: string) {
    const mutation = generateMutationBalance(mutationName, modelName, inputFields, returnFields);
    // Note: original code called graphqlQuery for mutation as well, which is valid since it's just a POST
    return await graphqlQuery(mutation, baseurl);
}
