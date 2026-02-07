import React, { useContext, useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Box,
    useTheme,
    Tooltip,
    Badge,
    Typography,
    Avatar,
    Divider,
} from "@mui/material";
import {
    DarkModeOutlined,
    LightModeOutlined,
    NotificationsNoneOutlined,
    SettingsOutlined,
    LogoutOutlined,
    Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../../theme";
import { jwtDecode } from "jwt-decode";
import Balances from "./components/Balances";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    let userName = "Pharmacist";
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            userName = decoded.unique_name || decoded.FirstName || "User";
        } catch (e) { }
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "hsl(var(--card))",
                color: "hsl(var(--foreground))",
                boxShadow: "none",
                borderBottom: "1px solid hsl(var(--border))",
                zIndex: 999,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
                {/* Left Side: Page Title or Breadcrumbs could go here */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Balances />
                </Box>

                {/* Right Side: Actions */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {/* Theme Toggle */}
                    <Tooltip title={theme.palette.mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                            sx={{ color: 'hsl(var(--muted-foreground))' }}
                        >
                            {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                        </IconButton>
                    </Tooltip>

                    {/* Notifications */}
                    <Tooltip title="Notifications">
                        <IconButton sx={{ color: 'hsl(var(--muted-foreground))' }}>
                            <Badge badgeContent={3} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: 'hsl(var(--primary))' } }}>
                                <NotificationsNoneOutlined />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Settings */}
                    <Tooltip title="Account Settings">
                        <IconButton sx={{ color: 'hsl(var(--muted-foreground))' }}>
                            <SettingsOutlined />
                        </IconButton>
                    </Tooltip>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center', borderColor: 'hsl(var(--border))' }} />

                    {/* User Info & Logout */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, display: { xs: 'none', sm: 'block' } }}>
                            {userName}
                        </Typography>
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout} sx={{ color: 'hsl(var(--destructive))' }}>
                                <LogoutOutlined />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
