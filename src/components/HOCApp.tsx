import React, { ComponentType } from "react";
import { Grid, Box } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const withLayout = <P extends object>(Component: ComponentType<P>) => {
    return (props: P) => (
        <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
                <Topbar />
                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                    <Component {...props} />
                </Box>
            </Box>
        </Box>
    );
};

export default withLayout;
