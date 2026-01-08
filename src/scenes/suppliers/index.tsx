import React from "react";
import DynamicTable from "../../components/DynamicTable";
import { GridColDef } from "@mui/x-data-grid";
import { salesManagementUri } from "../../config";

const Suppliers = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "supplierName", headerName: "Supplier Name", flex: 1.5 },
        { field: "kraPin", headerName: "KRA PIN", flex: 1 },
        { field: "contactPerson", headerName: "Contact Person", flex: 1 },
        { field: "phoneNumber", headerName: "Mobile", flex: 1 },
        { field: "status", headerName: "Status", flex: 0.5 },
    ];

    return (
        <DynamicTable
            title="Supplier Management"
            subtitle="Manage Suppliers and Purchase Orders"
            columns={columns}
            base_url={salesManagementUri}
            query="GET_SUPPLIERS"
            actions={{ edit: true, activateDeactivate: true }}
        />
    );
};

export default Suppliers;
