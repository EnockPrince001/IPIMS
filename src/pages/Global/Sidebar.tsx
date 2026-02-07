import { useState, useEffect } from "react";
import { Box, IconButton, Typography, useTheme, Tooltip, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
    HomeOutlined as DashboardIcon,
    Inventory2Outlined as InventoryIcon,
    PointOfSaleOutlined as SalesIcon,
    PeopleOutlined as CustomersIcon,
    AccountBalanceWalletOutlined as FinanceIcon,
    ManageAccountsOutlined as UsersIcon,
    AssessmentOutlined as ReportsIcon,
    AdminPanelSettingsOutlined as RolesIcon,
    SettingsOutlined as SetupIcon,
    BusinessOutlined as CompanyIcon,
    MenuOpen as MenuOpenIcon,
    Menu as MenuIcon,
    ExpandLess,
    ExpandMore,
    FiberManualRecord,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const SidebarItem = ({ title, to, icon, selected, setSelected, isCollapsed }: any) => {
    const isSelected = selected === title;
    return (
        <ListItemButton
            component={Link}
            to={to}
            onClick={() => setSelected(title)}
            sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: 2.5,
                mx: 1,
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isSelected ? 'hsl(var(--primary) / 0.1)' : 'transparent',
                color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                '&:hover': {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--primary))',
                },
                transition: 'all 0.2s ease',
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 2,
                    justifyContent: 'center',
                    color: 'inherit',
                }}
            >
                {icon}
            </ListItemIcon>
            {!isCollapsed && (
                <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: isSelected ? 600 : 500
                    }}
                />
            )}
        </ListItemButton>
    );
};

const SidebarGroup = ({ title, icon, isCollapsed, children, defaultOpen = false }: any) => {
    const [open, setOpen] = useState(defaultOpen);
    const handleClick = () => setOpen(!open);

    if (isCollapsed) {
        return (
            <Tooltip title={title} placement="right">
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 1, cursor: 'pointer', color: 'hsl(var(--muted-foreground))' }} onClick={handleClick}>
                    {icon}
                </Box>
            </Tooltip>
        );
    }

    return (
        <Box sx={{ mb: 1 }}>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    px: 2.5,
                    mx: 1,
                    borderRadius: '8px',
                    color: 'hsl(var(--muted-foreground))',
                    '&:hover': { backgroundColor: 'hsl(var(--accent))' }
                }}
            >
                <ListItemIcon sx={{ minWidth: 0, mr: 2, color: 'inherit' }}>{icon}</ListItemIcon>
                <ListItemText primary={title} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                    {children}
                </List>
            </Collapse>
        </Box>
    );
};

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const location = useLocation();

    // Decode token for user info
    let userName = "Pharmacist";
    let userRole = "Administrator";
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            userName = decoded.unique_name || decoded.FirstName || "User";
            userRole = decoded.role || "Administrator";
        } catch (e) { }
    }

    // Sync selection with current route
    useEffect(() => {
        const path = location.pathname;
        if (path === "/super-admin-dashboard") setSelected("Dashboard");
        else if (path === "/product") setSelected("Products");
        else if (path === "/customers") setSelected("Customers");
        else if (path === "/users") setSelected("Users");
        // ... add more as routes are defined
    }, [location.pathname]);

    return (
        <Box
            sx={{
                width: isCollapsed ? 80 : 280,
                height: "100vh",
                backgroundColor: "hsl(var(--card))",
                borderRight: "1px solid hsl(var(--border))",
                display: "flex",
                flexDirection: "column",
                transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflowX: "hidden",
                zIndex: 1000,
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', minHeight: 64 }}>
                {!isCollapsed && (
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--primary))', letterSpacing: '-0.5px' }}>
                        IPIMS
                    </Typography>
                )}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ color: 'hsl(var(--muted-foreground))' }}>
                    {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
                </IconButton>
            </Box>

            <Divider sx={{ opacity: 0.5, mx: 2 }} />

            {/* Navigation */}
            <Box sx={{ flexGrow: 1, py: 2, overflowY: 'auto', overflowX: 'hidden' }}>
                <SidebarItem
                    title="Dashboard"
                    to="/super-admin-dashboard"
                    icon={<DashboardIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                />

                <Box sx={{ px: 3, mt: 2, mb: 1, opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.2s' }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'hsl(var(--muted-foreground))', fontSize: 10 }}>
                        CORE MODULES
                    </Typography>
                </Box>

                {/* 1. Inventory Management */}
                <SidebarGroup title="Inventory" icon={<InventoryIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="Products" to="/product" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Expired Products" to="/expired-products" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>

                {/* 3. Sales Management */}
                <SidebarGroup title="Sales" icon={<SalesIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="POS Inventory" to="/pos" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Sales Orders" to="/pos-salesorders" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Sales Reversed" to="/pos-reverse-salesorders" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>

                {/* 4. Customer Management */}
                <SidebarItem
                    title="Customers"
                    to="/customers"
                    icon={<CustomersIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                />

                {/* 5. Accounts and Finance */}
                <SidebarGroup title="Finance" icon={<FinanceIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="Accounts Setup" to="/accounts-setups" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Chart of Accounts" to="/chart-of-accounts" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>

                <Box sx={{ px: 3, mt: 2, mb: 1, opacity: isCollapsed ? 0 : 1, transition: 'opacity 0.2s' }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, color: 'hsl(var(--muted-foreground))', fontSize: 10 }}>
                        ADMINISTRATION
                    </Typography>
                </Box>

                {/* 6. User Management */}
                <SidebarItem
                    title="Users"
                    to="/users"
                    icon={<UsersIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    isCollapsed={isCollapsed}
                />

                {/* 8. Role Management */}
                <SidebarGroup title="Roles" icon={<RolesIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="Manage Roles" to="/role" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Manage Rights" to="/rights" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>

                {/* 7. Reports Management */}
                <SidebarGroup title="Reports" icon={<ReportsIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="Major Classes" to="/reports-major-classification" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Report Browser" to="/report-browser" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>

                {/* 9. Setup & 10. Company */}
                <SidebarGroup title="Settings" icon={<SetupIcon />} isCollapsed={isCollapsed}>
                    <SidebarItem title="System Setup" to="/pos-setups" icon={<FiberManualRecord sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                    <SidebarItem title="Company Info" to="/manage-companies" icon={<CompanyIcon sx={{ fontSize: 8 }} />} selected={selected} setSelected={setSelected} />
                </SidebarGroup>
            </Box>

            {/* User Profile Summary */}
            <Box sx={{ p: 2, backgroundColor: 'hsl(var(--accent) / 0.5)' }}>
                {!isCollapsed ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                            {userName.charAt(0)}
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{userName}</Typography>
                            <Typography sx={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>{userRole}</Typography>
                        </Box>
                    </Box>
                ) : (
                    <Tooltip title={`${userName} (${userRole})`} placement="right">
                        <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, mx: 'auto' }}>
                            {userName.charAt(0)}
                        </Box>
                    </Tooltip>
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;
