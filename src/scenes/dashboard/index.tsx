import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Dashboard = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="bold" sx={{ mb: "5px" }}>
                    DASHBOARD
                </Typography>
                <Button variant="contained" color="primary">
                    Download Reports
                </Button>
            </Box>
            <Box mt="20px">
                <Typography variant="body1">
                    Welcome to the IPIMS Dashboard. This is a placeholder for the main dashboard content.
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
