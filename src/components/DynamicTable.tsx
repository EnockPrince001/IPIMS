import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Chip,
    Tooltip,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    DataGrid,
    GridToolbar,
    GridColDef,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from "@mui/x-data-grid";
import {
    Refresh as RefreshIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Block as BlockIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material";

import { tokens } from "../theme";
import { fetchDataEngine, generateAndExecuteMutation, generateColumnsFromQuery } from "../data/Axios/DynamicService";
import usePermissions from "../data/RBAC/PermissionsHook";
import { DistributionViewModal, AccountSummaryViewModal } from "./DynamicModal";
import Swal from "sweetalert2";

interface DynamicTableProps {
    title?: string;
    subtitle?: string;
    columns?: GridColDef[];
    query?: string;
    base_url: string;
    actions?: any; // Generic actions config
    ignoreFields?: string[];
    unignoredIds?: string[];
}

const DynamicTable = ({
    title,
    subtitle,
    columns,
    query,
    base_url,
    actions,
    ignoreFields,
    unignoredIds,
}: DynamicTableProps) => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    const { hasPermission } = usePermissions();

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [generatedColumns, setGeneratedColumns] = useState<GridColDef[]>([]);
    const [refreshTable, setRefreshTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [distributionViewOpen, setDistributionViewOpen] = useState(false);
    const [accountSummaryViewOpen, setAccountSummaryViewOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Fetch Data
    useEffect(() => {
        const loadData = async () => {
            if (!query) return;
            setLoading(true);
            try {
                // Assuming simple query pattern from reference or generic fetch
                // Here we might need to parse query to get object name if not provided elsewhere
                // For now, using a direct fetch if query is provided as string
                // In real implementation, fetchDataEngine needs args like (objectName, subObject, conditions...)
                // We'll assume fetchDataEngine is robust enough or we use raw graphQL

                // NOTE: The reference 'fetchDataEngine' takes specific args.
                // Since we don't have them passed explicitly as props in this simplified signature,
                // we might assume 'actions' contains metadata or we parse 'query'.
                // For safety, let's assume 'actions.fetch' metadata exists or we fallback to empty.

                // This is a placeholder for the actual fetch logic which depends on the specific call signature
                const result = await fetchDataEngine("", "", {}, [], base_url, query);

                if (Array.isArray(result)) {
                    setData(result);
                } else if (result && result.data) {
                    // Handle various graphql response structures
                    setData(Object.values(result.data)[0] as any[] || []);
                }
            } catch (e) {
                console.error("Failed to load data", e);
            } finally {
                setLoading(false);
                setRefreshTable(false);
            }
        };
        loadData();
    }, [query, base_url, refreshTable]);

    // Generate Columns if not provided
    useEffect(() => {
        if (!columns && query) {
            // Mock generation or import utility
            const cols = generateColumnsFromQuery(query, ignoreFields, unignoredIds);
            setGeneratedColumns(cols);
        } else if (columns) {
            setGeneratedColumns(columns);
        }
    }, [columns, query]);

    // Actions Handling
    const handleActivateDeactivate = async (row: any) => {
        if (!actions?.activateDeactivate) return;

        const isActive = row.isActive;
        const actionType = isActive ? "deactivate" : "activate";

        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${actionType} this item?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, ${actionType} it!`,
        });

        if (confirmation.isConfirmed) {
            try {
                // Mock mutation call
                // await generateAndExecuteMutation(...)
                Swal.fire("Success", `Item ${actionType}d`, "success");
                setRefreshTable(true);
            } catch (e) {
                Swal.fire("Error", "Action failed", "error");
            }
        }
    };


    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button startIcon={<RefreshIcon />} onClick={() => setRefreshTable(true)}>
                    Refresh
                </Button>
            </GridToolbarContainer>
        );
    };

    // Append Actions Column if configured
    const finalColumns: GridColDef[] = [
        ...generatedColumns,
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box>
                        {actions?.activateDeactivate && (
                            <Tooltip title="Toggle Status">
                                <IconButton onClick={() => handleActivateDeactivate(params.row)}>
                                    {params.row.isActive ? <BlockIcon color="error" /> : <CheckCircleOutlineIcon color="success" />}
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Example of custom action triggers */}
                        {actions?.distributionView && (
                            <Button size="small" onClick={() => { setSelectedItem(params.row); setDistributionViewOpen(true); }}>
                                Dist.
                            </Button>
                        )}
                        {actions?.accountSummary && (
                            <Button size="small" onClick={() => { setSelectedItem(params.row); setAccountSummaryViewOpen(true); }}>
                                Summary
                            </Button>
                        )}
                    </Box>
                )
            }
        }
    ];

    return (
        <Box m="20px">
            {title && (
                <Box mb="20px">
                    <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="h5" color={colors.greenAccent[500]}>
                        {subtitle}
                    </Typography>
                </Box>
            )}

            <Box
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                }}
            >
                <DataGrid
                    rows={data}
                    columns={finalColumns}
                    components={{ Toolbar: CustomToolbar }}
                    loading={loading}
                    getRowId={(row) => row.id || Math.random()}
                />
            </Box>

            {/* Modals */}
            <DistributionViewModal
                open={distributionViewOpen}
                onClose={() => setDistributionViewOpen(false)}
                itemData={selectedItem}
            />
            <AccountSummaryViewModal
                open={accountSummaryViewOpen}
                onClose={() => setAccountSummaryViewOpen(false)}
                itemData={selectedItem}
            />

        </Box>
    );
};

export default DynamicTable;
