// src/components/common/FilterBar/index.tsx
import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, any>) => void;
  // TODO: Add search input, clear filters button etc.
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const [currentFilters, setCurrentFilters] = React.useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    setCurrentFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilterChange(currentFilters);
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {filters.map((filter) => (
        <React.Fragment key={filter.key}>
          {filter.type === 'text' && (
            <TextField
              label={filter.label}
              variant="outlined"
              size="small"
              value={currentFilters[filter.key] || ''}
              onChange={(e) => handleChange(filter.key, e.target.value)}
            />
          )}
          {filter.type === 'select' && (
            <TextField
              select
              label={filter.label}
              variant="outlined"
              size="small"
              value={currentFilters[filter.key] || ''}
              onChange={(e) => handleChange(filter.key, e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {filter.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          {filter.type === 'date' && (
            <TextField
              label={filter.label}
              type="date"
              variant="outlined"
              size="small"
              value={currentFilters[filter.key] || ''}
              onChange={(e) => handleChange(filter.key, e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </React.Fragment>
      ))}
      <Button variant="contained" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
      {/* TODO: Add Clear Filters button */}
    </Box>
  );
};

export default FilterBar;
