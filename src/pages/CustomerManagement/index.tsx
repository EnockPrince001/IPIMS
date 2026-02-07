import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import {
    PeopleAltOutlined as UserIcon,
    PersonAddOutlined as AddUserIcon,
    HistoryOutlined as HistoryIcon,
    StarOutlineOutlined as LoyaltyIcon
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

const CustomerManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Customer Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Track client profiles, purchase history, and loyalty programs.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddUserIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                    Register Customer
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Customers" value="842" icon={<UserIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="New this Month" value="28" icon={<AddUserIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Loyalty" value="512" icon={<LoyaltyIcon />} color="hsl(var(--warning))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Avg. Visit Frequency" value="1.4/mo" icon={<HistoryIcon />} color="hsl(var(--primary))" />
                </Grid>
            </Grid>

            {/* Recent Customers Table */}
            <TableContainer component={Paper} sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', borderRadius: '12px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: 'hsl(var(--muted))' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Last Visit</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Total Spent</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <TableRow key={i}>
                                <TableCell>Customer {i}</TableCell>
                                <TableCell>+254 712 345 67{i}</TableCell>
                                <TableCell>2 days ago</TableCell>
                                <TableCell>$150.00</TableCell>
                                <TableCell><Box component="span" sx={{ px: 1, py: 0.5, borderRadius: '4px', backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', fontSize: '12px', fontWeight: 600 }}>Active</Box></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomerManagement;
