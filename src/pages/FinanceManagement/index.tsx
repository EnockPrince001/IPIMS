import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from "@mui/material";
import {
    AccountBalanceOutlined as BalanceIcon,
    ReceiptOutlined as ReceiptIcon,
    TrendingUpOutlined as RevenueIcon,
    TrendingDownOutlined as ExpenseIcon
} from "@mui/icons-material";

const StatCard = ({ title, value, icon, color, trend }: any) => (
    <Card sx={{ height: '100%', border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: '8px', backgroundColor: `${color}20`, color: color }}>
                    {icon}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
                    {trend && (
                        <Typography variant="caption" sx={{ color: trend > 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))', fontWeight: 600 }}>
                            {trend > 0 ? `+${trend}%` : `${trend}%`}
                        </Typography>
                    )}
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))', fontWeight: 500 }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

const FinanceManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Accounts & Finance
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Manage ledgers, taxes, expenses, and financial health.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>
                        View Ledgers
                    </Button>
                    <Button variant="contained" startIcon={<ReceiptIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                        Quick Expense
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Account Balance" value="$12,480.00" icon={<BalanceIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Monthly Revenue" value="$42.5k" icon={<RevenueIcon />} color="hsl(var(--primary))" trend={12} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Monthly Expenses" value="$8.2k" icon={<ExpenseIcon />} color="hsl(var(--destructive))" trend={-5} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Pending Invoices" value="14" icon={<ReceiptIcon />} color="hsl(var(--warning))" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 350 }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 600, mb: 2 }}>Financial Cash Flow</Typography>
                            <Box sx={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed hsl(var(--border))', borderRadius: '8px' }}>
                                <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>Cash Flow Chart Visualization</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 350 }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 600, mb: 2 }}>Quick Actions</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Button fullWidth sx={{ justifyContent: 'flex-start', color: 'hsl(var(--foreground))' }}>Generate P&L Report</Button>
                                <Button fullWidth sx={{ justifyContent: 'flex-start', color: 'hsl(var(--foreground))' }}>Reconcile Accounts</Button>
                                <Button fullWidth sx={{ justifyContent: 'flex-start', color: 'hsl(var(--foreground))' }}>Tax Filings</Button>
                                <Button fullWidth sx={{ justifyContent: 'flex-start', color: 'hsl(var(--foreground))' }}>Bank Integration</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FinanceManagement;
