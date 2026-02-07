import React from "react";
import DynamicTable from "../../../data/DynamicService/DynamicTable";
import { GridColDef } from "@mui/x-data-grid";
import { inventoryManagementUri } from "../../../config";

const Inventory = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "Med ID", flex: 0.5 },
        { field: "medicineName", headerName: "Medicine Name", flex: 1.5 },
        { field: "genericName", headerName: "Generic Name", flex: 1.5 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "batchNumber", headerName: "Batch No", flex: 1 },
        { field: "expiryDate", headerName: "Expiry Date", flex: 1 },
        { field: "stockQuantity", headerName: "In Stock", flex: 0.8 },
        { field: "price", headerName: "Price/Unit", flex: 0.8 },
        { field: "status", headerName: "Status", flex: 0.8 }, // Valid, Expired badge
    ];

    return (
        <DynamicTable
            title="Medicine Inventory"
            subtitle="Track Stock, Batches, and Expiry"
            columns={columns}
            base_url={inventoryManagementUri}
            query="GET_INVENTORY"
            actions={{ distributionView: true, edit: true }}
        />
    );
};

export default Inventory;
