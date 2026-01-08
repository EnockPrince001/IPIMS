import React, { useContext, useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    MenuItem,
    Menu,
    Box,
    useTheme,
    Tooltip,
    Badge,
    Popover,
    List,
    ListItem,
    Typography,
    Divider,
    ListItemText,
} from "@mui/material";
import {
    Search as SearchIcon,
    AccountCircle,
    Mail as MailIcon,
    Notifications as NotificationsIcon,
    MoreVert as MoreIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    SwapVertRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { styled, alpha } from "@mui/material/styles";
import { ColorModeContext, tokens } from "../../theme";
import { notificationsAndCount } from "../../data/Axios/queries";
import {
    graphqlMutation,
    graphqlQuery,
} from "../../data/Axios/DynamicService";
import { notificationservice, salesManagement } from "../../config";
import { jwtDecode } from "jwt-decode";
import Balances from "./components/Balances";

// Styled Search
const base_url = salesManagement.uri;
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2, // More rounded
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
    transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.shorter,
    }),
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add subtle shadow
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "24ch",
        },
    },
}));

interface Notification {
    notificationId: string;
    body: string;
    isRead: boolean;
    [key: string]: any;
}

interface NotificationState {
    notifications: Notification[];
    count: number;
}

const Topbar = () => {
    const theme = useTheme();
    // @ts-ignore
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = useState<NotificationState>({
        notifications: [],
        count: 0,
    });

    // Token decode logic
    let decodedToken: any = { Id: "0", RoleGroupId: "0", CompanyId: "0", isCompany: "0", isRegion: "0", isAdmin: "0" };
    const token = localStorage.getItem("token");
    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (e) {
            console.warn("Token Decode Error", e);
        }
    }

    // const userId = parseInt(decodedToken.Id);
    // const companyId = parseInt(decodedToken.CompanyId);

    useEffect(() => {
        let isMounted = true;
        async function fetchAllData() {
            try {
                const notificationsResponse: any = await graphqlQuery(
                    notificationsAndCount,
                    notificationservice.uri
                );
                if (isMounted && notificationsResponse) {
                    setNotifications(notificationsResponse);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        // Only fetch if token exists
        if (localStorage.getItem("token")) {
            fetchAllData();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handlePersonDetailsOpen = () => {
        navigate("/profile");
        setIsProfileOpen(true);
    };

    const handlePersonDetailsClose = () => {
        navigate("/super-admin-dashboard");
        setIsProfileOpen(false);
    };

    const handleIconClick = () => {
        if (isProfileOpen) {
            handlePersonDetailsClose();
        } else {
            handlePersonDetailsOpen();
        }
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        localStorage.clear();
        if (caches) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }
        navigate("/signin");
    };

    const handleMcbsWitch = () => {
        navigate("/MCB-SWITCH");
    };

    const handleNotificationClick = async (event: React.MouseEvent<HTMLElement>) => {
        const newAnchorEl = anchorEl ? null : event.currentTarget;
        setAnchorEl(newAnchorEl);

        if (!anchorEl) {
            try {
                // Call the mutation to mark all notifications as read
                const result = await graphqlMutation(
                    `mutation MarkNotificationsRead {
            markNotificationsRead {
              notificationId
              userId
              notificationType
              body
              templateId
              isRead
              createdDate
              companyId
              company
            }
          }`,
                    notificationservice.uri
                );

                setNotifications((prevNotifications) => ({
                    ...prevNotifications,
                    notifications: prevNotifications.notifications.map(
                        (notification) => ({ ...notification, isRead: true })
                    ),
                    count: 0,
                }));
            } catch (error) {
                console.error("Error marking notifications as read:", error);
            }
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorEl) && !open} // Hack to control menu separately if needed, but in original logic it was intertwined with notifications popover
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(mobileMoreAnchorEl)}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleNotificationClick}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge
                        badgeContent={notifications.count}
                        color="error"
                        sx={{
                            "& .MuiBadge-badge": {
                                backgroundColor: "#ff5722",
                                color: "#fff",
                            },
                        }}
                    >
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Box
                    p={2}
                    sx={{
                        width: "300px",
                        borderRadius: "0.75rem",
                        bgcolor:
                            theme.palette.mode === "light"
                                ? colors.blueAccent[900]
                                : colors.grey[600],
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: colors.greenAccent[400],
                        }}
                        variant="h6"
                    >
                        Notifications
                    </Typography>
                    <List>
                        {notifications.notifications?.map((notification) => (
                            <div key={notification.notificationId}>
                                <ListItem>
                                    <ListItemText primary={notification.body} />
                                </ListItem>
                                <Divider
                                    sx={{
                                        color: colors.redAccent[400],
                                    }}
                                />
                            </div>
                        ))}
                    </List>
                </Box>
            </Popover>
            <MenuItem onClick={handleNotificationClick}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge
                        badgeContent={notifications.count}
                        color="error"
                        sx={{
                            "& .MuiBadge-badge": {
                                backgroundColor: "#4caf50",
                                color: "#fff",
                            },
                        }}
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handlePersonDetailsOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutOutlinedIcon />
                </IconButton>
                <p>Log Out</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: colors.primary[500],
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" /* Modern shadow */,
                }}
            >
                <Toolbar sx={{ padding: "8px 24px" }}>
                    <Balances />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={colorMode.toggleColorMode}
                            sx={{
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: theme.palette.mode === "dark" ? "#ffc107" : "#ffeb3b",
                                },
                            }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <LightModeIcon />
                            ) : (
                                <DarkModeIcon />
                            )}
                        </IconButton>

                        {parseInt(decodedToken.isCompany) === 1 ||
                            parseInt(decodedToken.isRegion) === 1 ||
                            parseInt(decodedToken.isAdmin) === 1 ? (
                            <>
                                <Tooltip title="MCB Switch">
                                    <IconButton onClick={handleMcbsWitch}>
                                        <SwapVertRounded />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Logout">
                                    <IconButton onClick={handleLogout}>
                                        <LogoutOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        ) : (
                            <Tooltip title="Logout">
                                <IconButton onClick={handleLogout}>
                                    <LogoutOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                            onClick={handleNotificationClick}
                        >
                            <Badge badgeContent={notifications.count} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            onClick={handleNotificationClick}
                        >
                            <Badge badgeContent={notifications.count} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Profile">
                            <IconButton onClick={handleIconClick}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box
                        p={2}
                        sx={{
                            width: "300px",
                            borderRadius: "0.75rem",
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? colors.blueAccent[900]
                                    : colors.grey[600],
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 14,
                                color: colors.greenAccent[400],
                            }}
                            variant="h6"
                        >
                            Notifications
                        </Typography>
                        <List>
                            {notifications.notifications?.map((notification) => (
                                <div key={notification.notificationId}>
                                    <ListItem>
                                        <ListItemText primary={notification.body} />
                                    </ListItem>
                                    <Divider
                                        sx={{
                                            color: colors.redAccent[400],
                                        }}
                                    />
                                </div>
                            ))}
                        </List>
                    </Box>
                </Popover>
            </AppBar>
            {renderMobileMenu}
            {/* {renderMenu} */}
        </Box>
    );
};

export default Topbar;
