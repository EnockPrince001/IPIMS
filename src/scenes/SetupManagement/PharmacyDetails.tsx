// src/scenes/SetupManagement/PharmacyDetails.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchPharmacyConfig, updateTaxRate } from '../../store/reducers/pharmacyConfigReducer'; // Use reducer actions
import { setupService } from '../../services'; // For saving changes

const PharmacyDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pharmacyName, address, contactEmail, contactPhone, taxRate, defaultCurrency, isLoading, error } = useSelector(
    (state: RootState) => state.pharmacyConfig
  );

  const [editMode, setEditMode] = useState(false);
  const [localTaxRate, setLocalTaxRate] = useState(taxRate.toString()); // Local state for editing

  useEffect(() => {
    // Initial fetch of pharmacy config
    // TODO: This should be handled by a thunk in action, currently using direct fetch
    const getInitialConfig = async () => {
      // dispatch(fetchPharmacyConfigStart()); // Dispatch start action
      try {
        const config = await setupService.getPharmacyConfig();
        // dispatch(fetchPharmacyConfigSuccess(config)); // Dispatch success action
        // Directly update local state after fetch
        setLocalTaxRate(config.taxRate.toString());
      } catch (err: any) {
        // dispatch(fetchPharmacyConfigFailure(err.message)); // Dispatch failure action
      }
    };
    getInitialConfig();
  }, []); // Empty dependency array means this runs once on mount

  const handleSave = async () => {
    // TODO: Implement actual save logic via setupService
    console.log('Saving updated pharmacy details...');
    // Example: dispatch(updatePharmacyConfig({ taxRate: parseFloat(localTaxRate) }));
    dispatch(updateTaxRate(parseFloat(localTaxRate))); // Update Redux state
    setEditMode(false);
    // TODO: Call API to persist changes
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pharmacy Details
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        View and update general information about the pharmacy.
      </Typography>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Box component={Paper} sx={{ p: 3, mt: 3 }}>
        <TextField
          label="Pharmacy Name"
          fullWidth
          value={pharmacyName}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
          // TODO: Add onChange handler if editable
        />
        <TextField
          label="Address"
          fullWidth
          value={address}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
        />
        <TextField
          label="Contact Email"
          fullWidth
          value={contactEmail}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
        />
        <TextField
          label="Contact Phone"
          fullWidth
          value={contactPhone}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
        />
        <TextField
          label="Tax Rate (%)"
          fullWidth
          type="number"
          value={localTaxRate}
          onChange={(e) => setLocalTaxRate(e.target.value)}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
        />
        <TextField
          label="Default Currency"
          fullWidth
          value={defaultCurrency}
          margin="normal"
          InputProps={{ readOnly: !editMode }}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {editMode ? (
            <>
              <Button variant="outlined" onClick={() => setEditMode(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSave} disabled={isLoading}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)} disabled={isLoading}>
              Edit Details
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PharmacyDetails;
