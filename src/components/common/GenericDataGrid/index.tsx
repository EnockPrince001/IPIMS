// src/components/common/GenericDataGrid/index.tsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, Toolbar, Tooltip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useAbility } from '../../../data/RBAC/ability'; // Import useAbility hook

// Define common props for actions
interface ActionConfig {
  key: string;
  button_name: string;
  Show_Button: boolean;
  permission: string; // Corresponds to CASL action, e.g., 'create', 'update'
  entity: string; // Corresponds to CASL subject, e.g., 'PharmacyProduct'
  // TODO: Add icon, color, onClick handler for specific actions
  onClick?: (row: any) => void;
}

interface GenericDataGridProps {
  title: string;
  subtitle?: string;
  data: any[];
  columns: GridColDef[]; // Explicitly define columns
  actions?: ActionConfig[];
  FormComponent?: React.ComponentType<any>; // Component for add/edit form
  onRefresh?: () => void;
  // TODO: Add props for pagination, sorting, filtering configuration
  // TODO: Pass additional props to the FormComponent (e.g., initialValues, onSubmit)
}

const GenericDataGrid: React.FC<GenericDataGridProps> = ({
  title,
  subtitle,
  data,
  columns,
  actions = [],
  FormComponent,
  onRefresh,
}) => {
  const ability = useAbility(); // Access the ability object
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term (example client-side filtering)
  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = () => {
    setSelectedRow(null);
    setIsFormOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRow(null);
    if (onRefresh) onRefresh(); // Refresh data after form submission
  };

  const actionColumns: GridColDef[] = actions.length > 0
    ? [
        {
          field: 'actions',
          headerName: 'Actions',
          width: 150,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <Box>
              {actions.map((action) => {
                // Check if the user has permission for this action on this entity
                if (action.Show_Button && ability.can(action.permission, action.entity)) {
                  return (
                    <Tooltip key={action.key} title={action.button_name}>
                      <IconButton
                        onClick={() => {
                          if (action.key === 'EDIT') {
                            handleEdit(params.row);
                          } else if (action.onClick) {
                            action.onClick(params.row);
                          }
                          // TODO: Handle other specific actions
                        }}
                      >
                        {/* TODO: Render actual icon based on action.key */}
                        {action.key === 'EDIT' && <AddIcon color="info" />}
                        {/* Example: <DeleteIcon color="error" /> */}
                      </IconButton>
                    </Tooltip>
                  );
                }
                return null;
              })}
            </Box>
          ),
        },
      ]
    : [];

  return (
    <Box sx={{ p: 2, m: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Toolbar disableGutters sx={{ mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
        </Box>
        {onRefresh && (
          <Tooltip title="Refresh Data">
            <IconButton onClick={onRefresh}>
              {/* TODO: Add Refresh Icon */}
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        {FormComponent && actions.some(a => a.key === 'ADD' && a.Show_Button && ability.can(a.permission, a.entity)) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ ml: 2 }}
          >
            Add New
          </Button>
        )}
      </Toolbar>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* TODO: Integrate a more advanced FilterBar component here */}
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={[...columns, ...actionColumns]}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          // TODO: Integrate custom toolbar components (e.g., GridToolbar)
          // slots={{ toolbar: GridToolbar }}
        />
      </div>

      {FormComponent && (
        // TODO: Use a proper ModalWrapper component
        <Box>
          <Typography>Form Modal Placeholder</Typography>
          {/* <ModalWrapper open={isFormOpen} onClose={handleCloseForm} title={selectedRow ? 'Edit' : 'Add' + title}> */}
            <FormComponent
              initialValues={selectedRow}
              onSuccess={handleCloseForm}
              onCancel={handleCloseForm}
              // TODO: Pass submission handler from parent
            />
          {/* </ModalWrapper> */}
        </Box>
      )}
    </Box>
  );
};

export default GenericDataGrid;
