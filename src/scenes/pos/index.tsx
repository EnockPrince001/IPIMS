import React from "react";
import { Box, Grid, Paper, Typography, Button, TextField, Divider, List, ListItem, ListItemText } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const POS = () => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" height="85vh">
            <Grid container spacing={2} height="100%">
                {/* LEFT SECTION: Medicine Selection */}
                <Grid item xs={12} md={4} height="100%">
                    <Paper elevation={3} sx={{ height: "100%", p: 2, display: 'flex', flexDirection: 'column', backgroundColor: colors.primary[400] }}>
                        <Typography variant="h6" mb={2} fontWeight="bold">Medicine Selection</Typography>
                        <TextField fullWidth label="Search (Name, Generic, Barcode)" variant="outlined" sx={{ mb: 2 }} />

                        <Box flex={1} overflow="auto">
                            <List>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <React.Fragment key={item}>
                                        <ListItem disablePadding sx={{ mb: 1, backgroundColor: colors.primary[500], p: 1, borderRadius: 1 }}>
                                            <ListItemText primary={`Medicine Item ${item}`} secondary="Generic Name • 50 Units • KES 200" />
                                            <Button variant="contained" color="secondary" size="small">Add</Button>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </Paper>
                </Grid>

                {/* CENTER SECTION: Cart */}
                <Grid item xs={12} md={5} height="100%">
                    <Paper elevation={3} sx={{ height: "100%", p: 2, display: 'flex', flexDirection: 'column', backgroundColor: colors.primary[400] }}>
                        <Typography variant="h6" mb={2} fontWeight="bold">Current Sale (Cart)</Typography>

                        {/* Cart Table Placeholder */}
                        <Box flex={1} bgcolor={colors.primary[500]} borderRadius={1} p={1} mb={2}>
                            <Typography variant="body2" color="textSecondary" align="center">Cart Items will appear here</Typography>
                        </Box>

                        <Box borderTop={`1px solid ${colors.grey[100]}`} pt={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}><Typography>Subtotal:</Typography></Grid>
                                <Grid item xs={6} textAlign="right"><Typography fontWeight="bold">KES 0.00</Typography></Grid>

                                <Grid item xs={6}><Typography>VAT (16%):</Typography></Grid>
                                <Grid item xs={6} textAlign="right"><Typography fontWeight="bold">KES 0.00</Typography></Grid>

                                <Grid item xs={6}><Typography variant="h5" color={colors.greenAccent[500]}>TOTAL:</Typography></Grid>
                                <Grid item xs={6} textAlign="right"><Typography variant="h5" color={colors.greenAccent[500]} fontWeight="bold">KES 0.00</Typography></Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* RIGHT SECTION: Payment & Customer */}
                <Grid item xs={12} md={3} height="100%">
                    <Paper elevation={3} sx={{ height: "100%", p: 2, display: 'flex', flexDirection: 'column', backgroundColor: colors.primary[400] }}>
                        <Typography variant="h6" mb={2} fontWeight="bold">Customer & Payment</Typography>

                        <TextField fullWidth label="Customer (Optional)" size="small" sx={{ mb: 2 }} />

                        <Typography variant="subtitle2" mt={2}>Payment Method</Typography>
                        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                            <Button variant="contained" color="success">CASH</Button>
                            <Button variant="contained" color="success">M-PESA</Button>
                            <Button variant="contained" color="info">CARD</Button>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Button variant="contained" color="secondary" fullWidth size="large" sx={{ py: 2 }}>
                            COMPLETE SALE
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default POS;
