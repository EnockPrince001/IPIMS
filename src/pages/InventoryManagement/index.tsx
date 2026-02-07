import React from "react";
import { Box, Typography, Grid, Card, CardContent, IconButton, Button } from "@mui/material";
import {
    Inventory2Outlined as InventoryIcon,
    WarningAmberOutlined as ExpiredIcon,
    AddShoppingCartOutlined as PurchaseIcon,
    BarChartOutlined as StatsIcon
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

const InventoryManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Inventory Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Manage your medicine stock, batches, and expirations.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<PurchaseIcon />} sx={{ borderRadius: '8px', textTransform: 'none' }}>
                        New Purchase
                    </Button>
                    <Button variant="contained" startIcon={<InventoryIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                        Add Product
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Products" value="1,284" icon={<InventoryIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Expired Soon" value="42" icon={<ExpiredIcon />} color="hsl(var(--destructive))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Low Stock" value="15" icon={<WarningAmberOutlined sx={{ color: 'hsl(var(--warning))' }} />} color="hsl(var(--warning))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Stock Value" value="$42.5k" icon={<StatsIcon />} color="hsl(var(--primary))" />
                </Grid>
            </Grid>

            {/* Placeholder for Data Table */}
            <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 400 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ p: 3, borderRadius: '50%', backgroundColor: 'hsl(var(--accent))' }}>
                        <InventoryIcon sx={{ fontSize: 48, color: 'hsl(var(--muted-foreground))' }} />
                    </Box>
                    <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>Inventory Table Mockup</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

// Internal icons needed
import { WarningAmberOutlined } from "@mui/icons-material";

export default InventoryManagement;
