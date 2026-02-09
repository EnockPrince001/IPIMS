// src/components/hoc/Sidebar.tsx
import React from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalPharmacyOutlinedIcon from '@mui/icons-material/LocalPharmacyOutlined'; // For Pharmacy items
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined'; // For Patient/Prescription
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAbility } from '../../data/RBAC/ability';

// Define a MenuItem component for consistent styling and routing
interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
  permission?: { action: string; subject: string }; // CASL permission check
}

const Item: React.FC<ItemProps> = ({ title, to, icon, selected, setSelected, permission }) => {
  const theme = useTheme();
  const ability = useAbility();

  if (permission && !ability.can(permission.action, permission.subject)) {
    return null; // Don't render if user doesn't have permission
  }

  return (
    <MenuItem
      active={selected === title}
      style={{ color: theme.palette.text.primary }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { collapseSidebar, collapsed } = useProSidebar();
  const location = useLocation();
  const [selected, setSelected] = React.useState(location.pathname);
  const { logout } = useAuth();

  React.useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);

  return (
    <ProSidebar
      collapsed={collapsed}
      backgroundColor={theme.palette.background.paper}
      rootStyles={{
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => collapseSidebar()}
          icon={collapsed ? <MenuIcon /> : undefined}
          style={{
            margin: '10px 0 20px 0',
            color: theme.palette.text.primary,
          }}
        >
          {!collapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h5" color={theme.palette.primary.main}>
                IPIMS
              </Typography>
              <IconButton onClick={() => collapseSidebar()}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {/* User Profile Section (TODO) */}
        {!collapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* User Avatar */}
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h6"
                color={theme.palette.text.primary}
                fontWeight="bold"
                sx={{ m: '10px 0 0 0' }}
              >
                John Doe (Pharmacist)
              </Typography>
              <Typography variant="body2" color={theme.palette.secondary.main}>
                Admin
              </Typography>
            </Box>
          </Box>
        )}

        {/* Menu Items */}
        <Box paddingLeft={collapsed ? undefined : '10%'}>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'Dashboard' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Sales
          </Typography>
          <Item
            title="Dispense / POS"
            to="/pos/dispense"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'create', subject: 'SaleOrder' }}
          />
          <Item
            title="Transactions"
            to="/pos/transactions"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'SaleOrder' }}
          />
          <Item
            title="Suspended Orders"
            to="/pos/suspended"
            icon={<ReceiptOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'SaleOrder' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Inventory
          </Typography>
          <Item
            title="Products"
            to="/inventory/products"
            icon={<InventoryOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'PharmacyProduct' }}
          />
          <Item
            title="Stock Levels"
            to="/inventory/stock-levels"
            icon={<InventoryOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'PharmacyProduct' }}
          />
          <Item
            title="Receiving"
            to="/inventory/receiving"
            icon={<InventoryOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'create', subject: 'InventoryMovement' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Patients & Prescriptions
          </Typography>
          <Item
            title="Patients"
            to="/patients"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'Patient' }}
          />
          <Item
            title="Pending Rx"
            to="/prescriptions/pending"
            icon={<HealthAndSafetyOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'Prescription' }}
          />
          <Item
            title="New Prescription"
            to="/prescriptions/new"
            icon={<MedicalInformationOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'create', subject: 'Prescription' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Management
          </Typography>
          <Item
            title="Users"
            to="/users"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'User' }}
          />
          <Item
            title="Roles"
            to="/roles"
            icon={<SettingsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'Role' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Reporting
          </Typography>
          <Item
            title="Sales Reports"
            to="/reports/sales"
            icon={<BarChartOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'Report' }}
          />

          <Typography
            variant="caption"
            color={theme.palette.text.secondary}
            sx={{ m: '15px 0 5px 20px' }}
          >
            Setup
          </Typography>
          <Item
            title="Pharmacy Details"
            to="/setup/pharmacy-details"
            icon={<LocalPharmacyOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
            permission={{ action: 'read', subject: 'PharmacyConfig' }}
          />

          {/* Logout Button */}
          <MenuItem
            icon={<LogoutOutlinedIcon />}
            onClick={logout}
            style={{ color: theme.palette.error.main }}
          >
            <Typography>Logout</Typography>
          </MenuItem>
        </Box>
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
