// src/scenes/InventoryManagement/ProductsTable.tsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import GenericDataGrid from '../../components/common/GenericDataGrid';
import { IPharmacyProduct } from '../../data/models';
import { inventoryService } from '../../services';
import ProductForm from './ProductForm'; // Assuming a form for products

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IPharmacyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getPharmacyProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'genericName', headerName: 'Generic Name', flex: 1 },
    { field: 'strength', headerName: 'Strength', width: 120 },
    { field: 'dosageForm', headerName: 'Dosage Form', width: 150 },
    { field: 'unitPrice', headerName: 'Unit Price', type: 'number', width: 120 },
    { field: 'stockLevel', headerName: 'Stock Level', type: 'number', width: 120 },
    { field: 'isPrescriptionRequired', headerName: 'Rx Required', type: 'boolean', width: 120 },
    // TODO: Add more columns as needed
  ];

  const actions = [
    {
      key: 'ADD',
      button_name: 'Add Product',
      Show_Button: true,
      permission: 'create', // CASL action
      entity: 'PharmacyProduct', // CASL subject
    },
    {
      key: 'EDIT',
      button_name: 'Edit Product',
      Show_Button: true,
      permission: 'update', // CASL action
      entity: 'PharmacyProduct', // CASL subject
      // onClick defined within GenericDataGrid for 'EDIT'
    },
    {
      key: 'DELETE',
      button_name: 'Delete Product',
      Show_Button: true,
      permission: 'delete', // CASL action
      entity: 'PharmacyProduct', // CASL subject
      onClick: (row: IPharmacyProduct) => {
        // TODO: Implement delete logic
        console.log('Delete product:', row.name);
      },
    },
    // TODO: Add more actions like 'View Details', 'Adjust Stock'
  ];

  // TODO: Handle loading and error states in the UI
  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <GenericDataGrid
      title="Pharmacy Products"
      subtitle="Manage all drugs and products available in the pharmacy."
      data={products}
      columns={columns}
      actions={actions}
      FormComponent={ProductForm}
      onRefresh={fetchProducts}
    />
  );
};

export default ProductsTable;
