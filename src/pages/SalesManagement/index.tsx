import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import {
    PointOfSaleOutlined as SaleIcon,
    ReceiptLongOutlined as RefundIcon,
    PeopleAltOutlined as UserIcon,
    CurrencyExchangeOutlined as RevenueIcon
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

const SalesDashboard = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Sales Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Monitor transactions, manage orders, and process refunds.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" startIcon={<SaleIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                        Launch POS
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Daily Revenue" value="$4,820" icon={<RevenueIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Orders" value="156" icon={<SaleIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Refunds" value="3" icon={<RefundIcon />} color="hsl(var(--destructive))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Users" value="8" icon={<UserIcon />} color="hsl(var(--primary))" />
                </Grid>
            </Grid>

            {/* Sales Chart Mockup */}
            <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 300 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
                    <RevenueIcon sx={{ fontSize: 48, color: 'hsl(var(--muted-foreground))' }} />
                    <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>Sales Analytics Visualization</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SalesDashboard;
