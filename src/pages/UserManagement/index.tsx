import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import {
    ManageAccountsOutlined as UsersIcon,
    AdminPanelSettingsOutlined as RolesIcon,
    SecurityOutlined as RightsIcon,
    PersonAddOutlined as AddUserIcon
} from "@mui/icons-material";

const StatCard = ({ title, value, icon, color }: any) => (
    <Card sx={{ height: '100%', border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: '8px', backgroundColor: `${color}20`, color: color }}>
                    {icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))', fontWeight: 500 }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

const UserRoleManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Administration
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Manage system users, define roles, and assign access permissions.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<RolesIcon />} sx={{ borderRadius: '8px', textTransform: 'none' }}>
                        Manage Roles
                    </Button>
                    <Button variant="contained" startIcon={<AddUserIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                        Add User
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="Active Users" value="12" icon={<UsersIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="Total Roles" value="5" icon={<RolesIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard title="System Rights" value="48" icon={<RightsIcon />} color="hsl(var(--primary))" />
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', borderRadius: '12px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: 'hsl(var(--muted))' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Last Login</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Prince Enock</TableCell>
                            <TableCell>prince@ipims.com</TableCell>
                            <TableCell><Chip label="Super Admin" size="small" sx={{ fontWeight: 600, bgcolor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }} /></TableCell>
                            <TableCell>Just now</TableCell>
                            <TableCell><Box component="span" sx={{ px: 1, py: 0.5, borderRadius: '4px', backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', fontSize: '12px', fontWeight: 600 }}>Active</Box></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserRoleManagement;
