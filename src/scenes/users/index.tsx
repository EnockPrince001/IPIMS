import React from "react";
import DynamicTable from "../../components/DynamicTable";
import { GridColDef } from "@mui/x-data-grid";
import { userManagementUri } from "../../config";

const Users = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "User ID", flex: 0.5 },
        { field: "fullName", headerName: "Full Name", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
        { field: "licenseNumber", headerName: "PPB License", flex: 1 },
        { field: "phoneNumber", headerName: "Mobile", flex: 1 },
        { field: "status", headerName: "Status", flex: 0.5 },
        { field: "lastLogin", headerName: "Last Login", flex: 1 },
    ];

    return (
        <DynamicTable
            title="User Management"
            subtitle="Manage Admin, Pharmacists, and Cashiers"
            columns={columns}
            base_url={userManagementUri}
            query="GET_USERS" // Placeholder query identifier
            actions={{ activateDeactivate: true, edit: true }}
        />
    );
};

export default Users;
