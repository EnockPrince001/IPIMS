import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, useTheme } from "@mui/material";
import {
    DashboardOutlined as DashIcon,
    Inventory2Outlined as InventoryIcon,
    ShoppingCartOutlined as SalesIcon,
    TrendingUpOutlined as GrowthIcon,
    NotificationsActiveOutlined as AlertIcon
} from "@mui/icons-material";

const StatCard = ({ title, value, icon, color, trend }: any) => (
    <Card sx={{ height: '100%', border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1, borderRadius: '8px', backgroundColor: `${color}15`, color: color }}>
                    {icon}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>{value}</Typography>
                    <Typography variant="caption" sx={{ color: trend > 0 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))', fontWeight: 700 }}>
                        {trend > 0 ? `+${trend}%` : `${trend}%`} vs last week
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);

const AdminDashboard = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))', letterSpacing: '-0.5px' }}>
                        Pharmacy Overview
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Real-time summary of your pharmacy performance and alerts.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<DashIcon />} sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, px: 3 }}>
                    Refresh Data
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Today's Sales" value="$2,450" icon={<SalesIcon />} color="hsl(var(--primary))" trend={15} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Inventory Items" value="1,284" icon={<InventoryIcon />} color="hsl(var(--primary))" trend={2} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Revenue Growth" value="+24%" icon={<GrowthIcon />} color="hsl(var(--primary))" trend={8} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Critical Alerts" value="4" icon={<AlertIcon />} color="hsl(var(--destructive))" trend={-50} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 400 }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 700, mb: 3 }}>Revenue Trends</Typography>
                            <Box sx={{ height: 300, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'flex-end', justifyContent: 'space-around', pb: 2 }}>
                                {[40, 60, 45, 90, 65, 80, 55].map((h, i) => (
                                    <Box key={i} sx={{ width: '10%', height: `${h}%`, backgroundColor: 'hsl(var(--primary) / 0.8)', borderRadius: '4px 4px 0 0' }} />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))', minHeight: 400 }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 700, mb: 3 }}>Inventory Notifications</Typography>
                            <Box className="space-y-4">
                                {[
                                    { title: "Amoxicillin low stock", time: "2h ago", type: "warning" },
                                    { title: "Panadol batch expired", time: "5h ago", type: "error" },
                                    { title: "New shipment received", time: "Yesterday", type: "success" },
                                    { title: "Price update successful", time: "Yesterday", type: "success" }
                                ].map((alert, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1.5, borderRadius: '8px', backgroundColor: 'hsl(var(--accent) / 0.5)' }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: alert.type === 'error' ? 'hsl(var(--destructive))' : alert.type === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--primary))' }} />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{alert.title}</Typography>
                                            <Typography variant="caption" sx={{ color: 'hsl(var(--muted-foreground))' }}>{alert.time}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Button fullWidth sx={{ mt: 2, color: 'hsl(var(--primary))', fontWeight: 600 }}>View All Alerts</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
