import React, { ComponentType } from "react";
import { Box } from "@mui/material";
import Topbar from "../pages/Global/Topbar";
import Sidebar from "../pages/Global/Sidebar";

const withLayout = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <Box sx={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", backgroundColor: "hsl(var(--background))" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%", width: '100%', overflow: "hidden" }}>
                <Topbar />
                <Box component="main" sx={{ flexGrow: 1, overflow: "auto", p: 3, backgroundColor: 'hsl(var(--background))' }}>
                    <Component {...props} />
                </Box>
            </Box>
        </Box>
    );
};

export default withLayout;

