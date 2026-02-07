import React, { useState, useEffect, useMemo } from "react";
// @ts-ignore
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
    Chip,
    useTheme,
} from "@mui/material";
// @ts-ignore
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../theme";
import { graphqlQuery } from "../data/Axios/DynamicService";
import { accountAndFinanceUri, inventoryManagementUri } from "../config";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    itemData: any;
}

export function DistributionViewModal(props: ModalProps) {
    const { open, onClose, itemData } = props;
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [distributionData, setDistributionData] = useState<any[]>([]);

    const base_url = inventoryManagementUri;

    useEffect(() => {
        if (open && itemData) {
            if (!itemData.productCode || !itemData.branchId || !itemData.productId) {
                setError("Incomplete data. Cannot fetch distribution details.");
                setLoading(false);
                return;
            }

            const fetchDetails = async () => {
                setLoading(true);
                setError(null);

                const query = `
          query {
            inventoryDetailsByProductCode(inventory: { 
              productCode: "${itemData.productCode}", 
              branchId: ${itemData.branchId}, 
              productId: ${itemData.productId} 
            }) {
              id
              productName
              colorName
              sizeRange
              minSize
              maxSize
              quantity
              quantityPerCarton
              branchName
            }
          }
        `;

                try {
                    const response = await graphqlQuery(query, base_url);
                    if (response) {
                        setDistributionData(Array.isArray(response) ? response : []);
                    } else {
                        setDistributionData([]);
                    }
                } catch (err: any) {
                    setError(err.message || "An error occurred while fetching details.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails();
        }
    }, [open, itemData]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{
                    color: colors.grey[100],
                    borderBottom: `1px solid ${colors.grey[700]}`,
                }}
            >
                Distribution Details
                <Typography variant="body2" color="text.secondary">
                    {itemData?.productName} ({itemData?.productCode})
                </Typography>
            </DialogTitle>
            <DialogContent>
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Alert severity="error" sx={{ my: 2 }}>
                        {error}
                    </Alert>
                )}
                {!loading && !error && (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Size Range</TableCell>
                                    <TableCell>Min Size</TableCell>
                                    <TableCell>Max Size</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Qty/Carton</TableCell>
                                    <TableCell>Branch</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {distributionData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No distribution details found for this item.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    distributionData.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.colorName}</TableCell>
                                            <TableCell>{row.sizeRange}</TableCell>
                                            <TableCell>{row.minSize}</TableCell>
                                            <TableCell>{row.maxSize}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>{row.quantityPerCarton}</TableCell>
                                            <TableCell>{row.branchName}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function AccountSummaryViewModal(props: ModalProps) {
    const { open, onClose, itemData } = props;
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [summaryData, setSummaryData] = useState<any[]>([]);
    const [pageSize, setPageSize] = useState(10);

    // Advanced filtering state
    const [activeFilters, setActiveFilters] = useState<any[]>([]);

    const base_url = accountAndFinanceUri;

    useEffect(() => {
        if (open && itemData) {
            const accountId = itemData.id || itemData.accountID || itemData.AccountID;
            const accountSubcategoryId =
                itemData.accountSubcategoryId ||
                itemData.AccountSubcategoryId ||
                itemData.subcategoryId;

            const identifierType =
                itemData.identifierType ||
                itemData.IdentifierType ||
                itemData.type;

            if (!accountId && !accountSubcategoryId) {
                setError("Incomplete data. Cannot fetch Account Summary details.");
                setLoading(false);
                return;
            }

            const fetchDetails = async () => {
                setLoading(true);
                setError(null);

                const query = `
          query VwJournalLinesViewByColumnValues {
            vwJournalLinesViewByColumnValues(
                accountCategory: { accountID: ${accountId} }
            ) {
                id
                journalEntryID
                accountName
                accountNumber
                accountSubCategoryName
                accountCategoryName
                debit
                credit
                description
                createdDate
                createdBy
                applicationType
                cancelled
                branchName
            }
          }
        `;

                const groupQuery = `
          query VwJournalLinesViewByColumnValues {
            vwJournalLinesViewByColumnValues(
                accountCategory: { accountSubcategoryId: ${accountSubcategoryId} }
            ) {
                id
                journalEntryID
                accountName
                accountNumber
                accountSubCategoryName
                accountCategoryName
                debit
                credit
                description
                createdDate
                createdBy
                applicationType
                cancelled
                branchName
            }
          }
        `;

                try {
                    const response = await graphqlQuery(
                        identifierType === 1 ? query : groupQuery,
                        base_url
                    );

                    let journalData: any[] = [];
                    if (Array.isArray(response)) {
                        journalData = response;
                    } else if (response?.data?.vwJournalLinesViewByColumnValues) {
                        journalData = response.data.vwJournalLinesViewByColumnValues;
                    } else if (response?.vwJournalLinesViewByColumnValues) {
                        journalData = response.vwJournalLinesViewByColumnValues;
                    } else if (Array.isArray(response?.data)) {
                        journalData = response.data;
                    }

                    setSummaryData(Array.isArray(journalData) ? journalData : []);
                } catch (err: any) {
                    setError(
                        err.message ||
                        "An error occurred while fetching account summary details."
                    );
                    console.error("API Error:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails();
        } else {
            setSummaryData([]);
            setLoading(true);
            setError(null);
            setActiveFilters([]);
        }
    }, [open, itemData]);


    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            return "-";
        }
    };

    const formatCurrency = (amount: number) => {
        if (amount === null || amount === undefined) return "-";
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const handleClearAllFilters = () => {
        setActiveFilters([]);
    };

    const columns: GridColDef[] = [
        {
            field: "createdDate",
            headerName: "Entry Date",
            flex: 1,
            minWidth: 120,
            valueFormatter: (params: any) => formatDate(params.value),
        },
        {
            field: "journalEntryID",
            headerName: "Journal ID",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2,
            minWidth: 200,
        },
        {
            field: "debit",
            headerName: "Debit",
            flex: 1,
            minWidth: 100,
            type: "number",
            align: "right",
            headerAlign: "right",
            valueFormatter: (params: any) => formatCurrency(params.value),
        },
        {
            field: "credit",
            headerName: "Credit",
            flex: 1,
            minWidth: 100,
            type: "number",
            align: "right",
            headerAlign: "right",
            valueFormatter: (params: any) => formatCurrency(params.value),
        },
        {
            field: "branchName",
            headerName: "Branch",
            flex: 1,
            minWidth: 120,
        },
    ];

    // Apply multiple filters to data (Simplified for TS Port)
    const filteredData = useMemo(() => {
        if (activeFilters.length === 0) return summaryData;
        return summaryData;
        // TODO: Implement full client side filtering logic if needed matching the complex logic in reference
    }, [summaryData, activeFilters]);


    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            sx={{ "& .MuiDialog-paper": { height: "95vh" } }}
        >
            <DialogTitle
                sx={{
                    color: colors.grey[100],
                    borderBottom: `1px solid ${colors.grey[700]}`,
                    backgroundColor:
                        colors?.primary?.[400] || theme.palette.background.paper,
                    p: 2,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" component="div">
                                Account Summary Details
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {itemData?.accountName || itemData?.AccountName} (
                                {itemData?.accountNumber || itemData?.AccountNumber})
                            </Typography>
                        </Box>
                        <IconButton onClick={onClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column" }}>
                {loading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Alert severity="error" sx={{ m: 2 }}>
                        {error}
                    </Alert>
                )}
                {!loading && !error && (
                    <Box
                        sx={{
                            flex: 1,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <DataGrid
                            rows={filteredData}
                            columns={columns}
                            // pageSize={pageSize}
                            // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            // rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            disableRowSelectionOnClick
                            sortingMode="client"
                            filterMode="client"
                            pagination
                            sx={{
                                border: 0,
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor:
                                        colors?.primary?.[400] || theme.palette.background.default,
                                    color: colors.grey[100],
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: `1px solid ${colors.grey[700]}`,
                                },
                            }}
                        />
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}

// Export placeholder object for others if needed
export const DocumentAccessModal = () => null;
export const UpdateCaseStatusModal = () => null;
export const AssignTaskModal = () => null;
export const MarkPaid = () => null;
export const RetailDistributionViewModal = () => null;
export const SummaryViewModal = () => null;
export const ReceiptViewModal = () => null;
