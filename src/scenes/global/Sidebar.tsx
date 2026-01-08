import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
// @ts-ignore
import userImage from "../../assets/images/user.png";
import {
    HomeOutlined,
    PeopleOutlined,
    ContactsOutlined,
    ReceiptOutlined,
    PersonOutlined,
    CalendarTodayOutlined,
    HelpOutlineOutlined,
    BarChartOutlined,
    PieChartOutlineOutlined,
    TimelineOutlined,
    MenuOutlined,
    MapOutlined,
    PointOfSale,
    Inventory2Outlined,
    CategoryOutlined,
    LocalShippingOutlined,
    AssessmentOutlined,
    SettingsOutlined,
    AccountBalanceWalletOutlined,
    PaymentOutlined,
    StoreOutlined,
    ShoppingCartOutlined,
    SummarizeOutlined,
    DescriptionOutlined,
    GavelOutlined,
    BusinessOutlined,
    EmailOutlined,
    NotificationsOutlined,
    ListAlt,
    CardTravel,
    Group,
    Report,
    Cases,
    Warning,
    Money,
    MoneyOff,
    Balance,
    Calculate,
    Rule,
} from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

// Icon mapping helper
const getIconByName = (iconName: string) => {
    switch (iconName) {
        case "HomeOutlined": return <HomeOutlined />;
        case "PeopleOutlined": return <PeopleOutlined />;
        case "ContactsOutlined": return <ContactsOutlined />;
        case "ReceiptOutlined": return <ReceiptOutlined />;
        case "PersonOutlined": return <PersonOutlined />;
        case "CalendarTodayOutlined": return <CalendarTodayOutlined />;
        case "HelpOutlineOutlined": return <HelpOutlineOutlined />;
        case "BarChartOutlined": return <BarChartOutlined />;
        case "PieChartOutlineOutlined": return <PieChartOutlineOutlined />;
        case "TimelineOutlined": return <TimelineOutlined />;
        case "MenuOutlined": return <MenuOutlined />;
        case "MapOutlined": return <MapOutlined />;
        case "PointOfSale": return <PointOfSale />;
        case "Inventory2Outlined": return <Inventory2Outlined />;
        case "CategoryOutlined": return <CategoryOutlined />;
        case "LocalShippingOutlined": return <LocalShippingOutlined />;
        case "AssessmentOutlined": return <AssessmentOutlined />;
        case "SettingsOutlined": return <SettingsOutlined />;
        case "AccountBalanceWalletOutlined": return <AccountBalanceWalletOutlined />;
        case "PaymentOutlined": return <PaymentOutlined />;
        case "StoreOutlined": return <StoreOutlined />;
        case "ShoppingCartOutlined": return <ShoppingCartOutlined />;
        case "SummarizeOutlined": return <SummarizeOutlined />;
        case "DescriptionOutlined": return <DescriptionOutlined />;
        case "GavelOutlined": return <GavelOutlined />;
        case "BusinessOutlined": return <BusinessOutlined />;
        case "EmailOutlined": return <EmailOutlined />;
        case "NotificationsOutlined": return <NotificationsOutlined />;
        case "ListAlt": return <ListAlt />;
        case "CardTravel": return <CardTravel />;
        case "Group": return <Group />;
        case "Report": return <Report />;
        case "Cases": return <Cases />;
        case "Warning": return <Warning />;
        case "Money": return <Money />;
        case "MoneyOff": return <MoneyOff />;
        case "Balance": return <Balance />;
        case "Calculate": return <Calculate />;
        case "Rule": return <Rule />;
        default: return <HelpOutlineOutlined />;
    }
};

const Item = ({ title, to, icon, selected, setSelected }: any) => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={typeof icon === 'string' ? getIconByName(icon) : icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const location = useLocation();

    useEffect(() => {
        // Parse rights from local storage
        const storedRights = localStorage.getItem("rights");
        if (storedRights) {
            try {
                const parsedRights = JSON.parse(storedRights);
                // Sort by displayOrder if available
                const sorted = parsedRights.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
                setMenuItems(sorted);
            } catch (e) {
                console.error("Failed to parse rights", e);
            }
        }
    }, []);

    // Update selected based on path
    useEffect(() => {
        // Simple logic to highlight based on path (optional enhancement)
        // For now keeping manual selection state as per reference logic mostly
    }, [location.pathname]);

    // Decode token for user info
    let userName = "User";
    let userRole = "Admin";
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            userName = decoded.unique_name || decoded.FirstName || "User";
            userRole = decoded.role || "Admin";
        } catch (e) { }
    }

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    IPIMS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={userImage}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {userName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {userRole}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Modules
                        </Typography>

                        {/* Default Static Menu for Testing */}
                        <Item
                            title="Dashboard"
                            to="/super-admin-dashboard"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Pharmacy
                        </Typography>
                        <Item
                            title="POS Point of Sale"
                            to="/pos"
                            icon={<ReceiptOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Medicine Inventory"
                            to="/inventory"
                            icon={<Inventory2Outlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Prescriptions"
                            to="/prescriptions" // Placeholder route
                            icon={<ReceiptOutlined />} // Reused icon
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Admin
                        </Typography>
                        <Item
                            title="User Management"
                            to="/users"
                            icon={<PeopleOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Suppliers"
                            to="/suppliers"
                            icon={<ContactsOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        {/* Dynamic Menu from Rights (Existing Logic) */}
                        {menuItems.map((menuItem: any) => (
                            <Item
                                key={menuItem.id || menuItem.module} // Use ID or name as key
                                title={menuItem.module} // Use 'module' as the title (e.g., "Role Management")
                                to={`/${menuItem.module.replace(/\s+/g, "-").toLowerCase()}`} // Create a path
                                icon={menuItem.icon || "HelpOutlineOutlined"} // Use icon from rights or default
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
