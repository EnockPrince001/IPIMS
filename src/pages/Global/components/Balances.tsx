import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Modal,
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
    Tooltip,
    Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import { salesManagement } from "../../../config";
import {
    fetchDataEngineBalance,
    graphqlQuery,
    mutateDataEngineBalance,
} from "../../../data/DynamicService/DynamicService";
import { tokens } from "../../../theme";
import jsPDF from "jspdf";
import eventEmitter from "./eventEmitter";
import dayjs from "dayjs";
import { Wallet, Clock, FileText } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const base_url = salesManagement.uri;

/* ===========================
   Styles & helper interfaces
   =========================== */
interface BalanceData {
    openingBalance: number | null;
    closingBalance: number | null;
    cashSales?: number;
    creditSales?: number;
    mpesaSales?: number;
    netSales?: number;
    refunds?: number;
    expectedClosingBalance?: number;
    openingDate?: string;
    closingDate?: string;
    [key: string]: any;
}

interface DecodedToken {
    Id: string;
    RoleGroupId: string;
    CompanyId: string;
    FirstName: string;
    LastName: string;
    [key: string]: any;
}

const BalanceCard = styled(Card)(({ theme }) => ({
    borderRadius: 12,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    height: "auto",
    minHeight: 20,
    cursor: "pointer",
    background: theme.palette.mode === 'dark'
        ? "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--accent)) 100%)"
        : "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.15) 100%)",
    border: `1px solid hsl(var(--border))`,
    boxShadow: "none",
    transition: "transform 220ms ease, box-shadow 220ms ease",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
}));


const modalBase = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "hsl(var(--background))",
    boxShadow: 24,
    p: 3,
    borderRadius: 14,
    border: "1px solid hsl(var(--border))",
    animation: "fadeIn 180ms ease",
    "@keyframes fadeIn": {
        from: { opacity: 0, transform: "translate(-50%, -48%)" },
        to: { opacity: 1, transform: "translate(-50%, -50%)" },
    },
};


const formatCurrency = (val: any) =>
    typeof val === "number" ? val.toLocaleString() : val || 0;

/* ===========================
   Component
   =========================== */
const Balances = () => {
    const [balances, setBalances] = useState<BalanceData[]>([{ openingBalance: null, closingBalance: null }]);
    const [modalOpen, setModalOpen] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [newOpeningBalance, setNewOpeningBalance] = useState("");
    const [closeShiftData, setCloseShiftData] = useState<BalanceData[] | null>(null);

    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);

    // Safely decode token
    let decodedToken: DecodedToken = { Id: "0", RoleGroupId: "0", CompanyId: "0", FirstName: "Guest", LastName: "" };
    const token = localStorage.getItem("token");
    if (token) {
        try {
            // Handle cases where token might be a generic string or actual JWT
            // In the reference, it used jwtDecode(localStorage.token) which implies 'token' key exists
            // Also the reference had JSON.parse(localStorage.getItem("decodedToken")), let's try to stick to JWT decode if possible or fallback

            // Attempting fresh decode
            const decoded = jwtDecode<any>(token);
            decodedToken = {
                Id: decoded.Id || decoded.nameid || "0", // Common claims
                RoleGroupId: decoded.RoleGroupId || "0",
                CompanyId: decoded.CompanyId || "0",
                FirstName: decoded.FirstName || decoded.given_name || "User",
                LastName: decoded.LastName || decoded.family_name || "",
            };

        } catch (e) {
            console.warn("Token Decode Error", e);
        }
    }

    const userId = parseInt(decodedToken.Id);
    const roleGroupId = parseInt(decodedToken.RoleGroupId);
    const companyId = parseInt(decodedToken.CompanyId);

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const getOpeningandClosingBalance = async (manualBalance: string | null = null) => {
        try {
            const decimalBalance = manualBalance ? parseFloat(manualBalance) : null;
            const balancesData = await fetchDataEngineBalance(
                "openingClosingBalance",
                "functionparams",
                { companyId, createdBy: userId, manualOpeningBalance: decimalBalance },
                ["openingBalance", "closingBalance", "cashSales", "creditSales", "mpesaSales"],
                base_url
            );
            setBalances(balancesData);
        } catch (error) {
            console.error("Error fetching balances:", error);
            setBalances([{ openingBalance: null, closingBalance: null }]);
        }
    };

    useEffect(() => {
        if (roleGroupId === 1 || roleGroupId === 2) return; // Skip for admin users
        getOpeningandClosingBalance();

        // @ts-ignore - Event Emitter type compatibility
        const handleUpdateBalances = () => getOpeningandClosingBalance();
        // @ts-ignore
        eventEmitter.on("updateBalances", handleUpdateBalances);
        // @ts-ignore
        return () => eventEmitter.off("updateBalances", handleUpdateBalances);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenShift = () => {
        if (!newOpeningBalance) return;
        getOpeningandClosingBalance(newOpeningBalance);
        setModalOpen(false);
        setNewOpeningBalance("");
    };

    const handleCloseShift = async () => {
        try {
            const checkPendingCartQuery = `query HasCartItems { hasCartItems }`;
            const hasPendingItems = await graphqlQuery(checkPendingCartQuery, base_url);

            if (hasPendingItems) {
                await Swal.fire({
                    icon: 'warning',
                    title: 'Cannot Close Shift',
                    html: `
            <p>You have <strong>pending items</strong> in your cart.</p>
            <p>Please complete or clear all sales before closing the shift.</p>
          `,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#E74C3C',
                });
                return;
            }

            const confirmation = await Swal.fire({
                title: "Close Shift?",
                text: "Confirm to close the current shift.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Close",
                cancelButtonText: "Cancel",
            });

            if (confirmation.isConfirmed) {
                const response = await mutateDataEngineBalance(
                    "closeShift",
                    "functionparams",
                    { companyId, createdBy: userId },
                    [
                        "openingBalance",
                        "closingBalance",
                        "netSales",
                        "cashSales",
                        "creditSales",
                        "mpesaSales",
                        "refunds",
                        "expectedClosingBalance",
                        "openingDate",
                        "closingDate",
                    ],
                    base_url
                );

                if (response) {
                    setCloseShiftData(response);
                    setSummaryModalOpen(true);
                    getOpeningandClosingBalance();
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while closing the shift.",
            });
        }
    };

    const isDataAvailable = balances.length > 0 && balances[0].openingBalance !== null;

    const downloadReport = () => {
        if (!closeShiftData) return;
        const doc = new jsPDF();
        const reportData = closeShiftData[0];

        // Title
        doc.setFontSize(16);
        doc.setTextColor(35, 35, 35);
        const title = "Shift Report Summary";
        const pw = doc.internal.pageSize.getWidth();
        doc.text(title, (pw - doc.getTextWidth(title)) / 2, 20);

        // Worker & dates
        const worker = `${decodedToken.FirstName || "N/A"} ${decodedToken.LastName || ""}`;
        doc.setFontSize(11);
        doc.text(`Worker: ${worker}`, 20, 34);
        doc.text(
            `Opening: ${dayjs(reportData.openingDate).format("MMM D, YYYY h:mm A")}`,
            20,
            42
        );
        doc.text(
            `Closing: ${dayjs(reportData.closingDate).format("MMM D, YYYY h:mm A")}`,
            20,
            50
        );

        doc.line(20, 55, pw - 20, 55);

        // Key numbers
        const rows = [
            ["Opening Balance", reportData.openingBalance || 0],
            ["Closing Balance", reportData.closingBalance || 0],
            ["Net Sales", reportData.netSales || 0],
            ["Cash Sales", reportData.cashSales || 0],
            ["Credit Sales", reportData.creditSales || 0],
            ["MPesa Sales", reportData.mpesaSales || 0],
            ["Refunds", reportData.refunds || 0],
            ["Expected Closing", reportData.expectedClosingBalance || 0],
        ];

        let y = 66;
        doc.setFontSize(10);
        rows.forEach(([label, value]) => {
            doc.text(`${label}:`, 20, y);
            doc.text(String(value), pw - 60, y);
            y += 8;
        });

        doc.save("ShiftReport.pdf");
    };

    const openVal = isDataAvailable ? formatCurrency(balances[0].openingBalance) : "N/A";
    const closeVal = isDataAvailable ? formatCurrency(balances[0].closingBalance) : "N/A";

    return (
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>

            <Tooltip title="Balances summary" arrow>
                <BalanceCard
                    onClick={() => setModalOpen(true)}
                    sx={{ minWidth: isMobile ? 140 : 200, flexShrink: 0 }}
                >
                    <CardContent sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
                            <Box display="flex" gap={1} alignItems="center">
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Wallet size={18} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontSize: 11 }}>Open</Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{openVal}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box display="flex" gap={1} alignItems="center">
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Clock size={16} />
                                    <Box>
                                        <Typography variant="caption" sx={{ fontSize: 11 }}>Close</Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#B91C1C" }}>{closeVal}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </BalanceCard>
            </Tooltip>

            <Button
                variant="contained"
                onClick={isDataAvailable ? handleCloseShift : () => setModalOpen(true)}
                sx={{
                    bgcolor: isDataAvailable ? "hsl(var(--destructive))" : "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 700,
                    height: 40,
                    minWidth: isMobile ? 80 : 110,
                    "&:hover": {
                        bgcolor: isDataAvailable ? "hsl(var(--destructive) / 0.9)" : "hsl(var(--primary) / 0.9)"
                    },
                }}
            >
                {isDataAvailable ? "Close Shift" : "Start Shift"}
            </Button>


            {/* ---------------------
          Start / Quick Modal
         --------------------- */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={{ ...modalBase, width: isMobile ? 300 : 380 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" gap={1} alignItems="center">
                            <FileText size={18} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {isDataAvailable ? "Sales Snapshot" : "Start Shift"}
                            </Typography>
                        </Box>
                        <Chip
                            label={isDataAvailable ? "Active" : "No Shift"}
                            color={isDataAvailable ? "success" : "default"}
                            size="small"
                        />
                    </Box>

                    <Divider sx={{ my: 2, borderColor: "#97caec" }} />

                    {isDataAvailable ? (
                        <Box display="flex" flexDirection="column" gap={1.25}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Opening Balance</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(balances[0].openingBalance || 0)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Cash Sales</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(balances[0].cashSales || 0)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Credit Sales</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(balances[0].creditSales || 0)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Mpesa Sales</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{formatCurrency(balances[0].mpesaSales || 0)}</Typography>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt={1}>
                                <Button variant="outlined" onClick={() => setModalOpen(false)}>
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                                No active shift. Enter an opening balance to start.
                            </Typography>
                            <TextField
                                label="Opening Balance"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={newOpeningBalance}
                                onChange={(e) => setNewOpeningBalance(e.target.value)}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                            <Box display="flex" gap={1} justifyContent="flex-end" mt={1}>
                                <Button variant="contained" onClick={handleOpenShift} disabled={!newOpeningBalance}>
                                    Start
                                </Button>
                                <Button variant="outlined" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>

            {/* ---------------------
          Summary Modal after closing shift
         --------------------- */}
            <Modal open={summaryModalOpen} onClose={() => setSummaryModalOpen(false)}>
                <Box sx={{ ...modalBase, width: isMobile ? 340 : 560 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            Shift Summary
                        </Typography>
                        <Chip label="Report" size="small" sx={{ bgcolor: "#97caec", color: "#032c4a", fontWeight: 700 }} />
                    </Box>

                    <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                        {decodedToken.FirstName} {decodedToken.LastName}
                    </Typography>

                    {closeShiftData && closeShiftData[0] && (
                        <>
                            <Divider sx={{ my: 1.5, borderColor: "#97caec" }} />

                            <Box display="grid" gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={1}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Opening</Typography>
                                    <Typography variant="body2">{dayjs(closeShiftData[0].openingDate).format("MMM D, YYYY h:mm A")}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Closing</Typography>
                                    <Typography variant="body2">{dayjs(closeShiftData[0].closingDate).format("MMM D, YYYY h:mm A")}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 1.5, borderColor: "#97caec" }} />

                            <Box display="flex" flexDirection="column" gap={1}>
                                {[
                                    { label: "Opening Balance", val: closeShiftData[0].openingBalance },
                                    { label: "Closing Balance", val: closeShiftData[0].closingBalance },
                                    { label: "Net Sales", val: closeShiftData[0].netSales },
                                    { label: "Cash Sales", val: closeShiftData[0].cashSales },
                                    { label: "Credit Sales", val: closeShiftData[0].creditSales },
                                    { label: "MPesa Sales", val: closeShiftData[0].mpesaSales },
                                    { label: "Refunds", val: closeShiftData[0].refunds },
                                    { label: "Expected Closing", val: closeShiftData[0].expectedClosingBalance },
                                ].map((it, i) => (
                                    <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" sx={{ color: "#2c3e50" }}>{it.label}</Typography>
                                        <Chip label={formatCurrency(it.val || 0)} size="small" variant="outlined" />
                                    </Box>
                                ))}
                            </Box>

                            <Box display="flex" gap={1} mt={3}>
                                <Button variant="contained" onClick={downloadReport} sx={{ flex: 1 }}>
                                    Download PDF
                                </Button>
                                <Button variant="outlined" onClick={() => setSummaryModalOpen(false)} sx={{ width: 120 }}>
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Balances;
