import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Divider, Switch, FormControlLabel } from "@mui/material";
import {
    SettingsOutlined as SetupIcon,
    BusinessOutlined as CompanyIcon,
    PaletteOutlined as ThemeIcon,
    BackupOutlined as BackupIcon,
    GavelOutlined as LegalIcon
} from "@mui/icons-material";

const SetupManagement = () => {
    return (
        <Box className="space-y-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'hsl(var(--foreground))' }}>
                        System Setup & Company
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>
                        Configure system preferences, business details, and integrations.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<BackupIcon />} sx={{ borderRadius: '8px', textTransform: 'none', backgroundColor: 'hsl(var(--primary))' }}>
                    Backup System
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <CompanyIcon sx={{ color: 'hsl(var(--primary))' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>Company Information</Typography>
                            </Box>
                            <Box className="space-y-4">
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>Business Name</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>IPIMS Pharmacy Ltd</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>Tax ID / PIN</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>P051234567Z</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" sx={{ color: 'hsl(var(--muted-foreground))' }}>Location</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Nairobi, Kenya</Typography>
                                </Box>
                            </Box>
                            <Button fullWidth variant="outlined" sx={{ mt: 3, borderRadius: '8px' }}>Edit Company Details</Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <SetupIcon sx={{ color: 'hsl(var(--primary))' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>System Preferences</Typography>
                            </Box>
                            <Box className="space-y-2">
                                <FormControlLabel control={<Switch defaultChecked />} label="Email Notifications" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Auto-Backup Daily" />
                                <FormControlLabel control={<Switch />} label="Dark Mode by Default" />
                                <FormControlLabel control={<Switch defaultChecked />} label="Two-Factor Authentication" />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ border: '1px solid hsl(var(--border))', boxShadow: 'none', backgroundColor: 'hsl(var(--card))' }}>
                        <CardContent>
                            <Typography sx={{ fontWeight: 700, mb: 2 }}>Integrations</Typography>
                            <Grid container spacing={2}>
                                {['M-Pesa API', 'SMS Gateway', 'Cloud Storage', 'External Accounting'].map((api) => (
                                    <Grid item xs={12} sm={6} md={3} key={api}>
                                        <Box sx={{ p: 2, border: '1px solid hsl(var(--border))', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{api}</Typography>
                                            <Typography variant="caption" sx={{ color: 'hsl(var(--primary))', fontWeight: 700 }}>CONNECTED</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SetupManagement;
