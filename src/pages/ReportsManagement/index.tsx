import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import {
    AssessmentOutlined as ReportsIcon,
    DescriptionOutlined as FileIcon,
    PieChartOutlined as ChartIcon,
    DownloadOutlined as DownloadIcon,
    HistoryOutlined as HistoryIcon
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

const ReportsManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        Reports & Analytics
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Generate insights, export data, and monitor business performance.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                    Generate Summary
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Reports Generated" value="128" icon={<ReportsIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Storage Used" value="2.4 GB" icon={<FileIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Manual Pulls" value="15" icon={<HistoryIcon />} color="hsl(var(--primary))" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="System Uptime" value="99.9%" icon={<ChartIcon />} color="hsl(var(--primary))" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 600, mb: 2 }}>Common Reports</Typography>
                            <List>
                                {[
                                    { title: "Inventory Expiry Report", desc: "Detailed list of drugs expiring in 60 days" },
                                    { title: "Daily Sales Summary", desc: "Cash, Mpesa, and Credit breakdown" },
                                    { title: "Profit & Loss Statement", desc: "Monthly financial performance overview" },
                                    { title: "Supplier Performance", desc: "Fulfilment rates and pricing trends" }
                                ].map((report, idx) => (
                                    <React.Fragment key={idx}>
                                        <ListItem sx={{ px: 0, py: 1.5 }}>
                                            <ListItemIcon sx={{ minWidth: 40, color: 'hsl(var(--primary))' }}><FileIcon sx={{ fontSize: 20 }} /></ListItemIcon>
                                            <ListItemText
                                                primary={report.title}
                                                secondary={report.desc}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                                                secondaryTypographyProps={{ fontSize: 12 }}
                                            />
                                            <IconButton size="small"><DownloadIcon sx={{ fontSize: 18 }} /></IconButton>
                                        </ListItem>
                                        {idx < 3 && <Divider sx={{ opacity: 0.5 }} />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 600, mb: 2 }}>Analytics Overview</Typography>
                            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed hsl(var(--border))', borderRadius: '8px' }}>
                                <ChartIcon sx={{ fontSize: 64, color: 'hsl(var(--muted-foreground))', mb: 1 }} />
                                <Typography sx={{ color: 'hsl(var(--muted-foreground))' }}>Advanced Analytics Charts</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportsManagement;
