// src/scenes/InventoryManagement/ProductForm.tsx
import React from 'react';
import { TextField, Switch, FormControlLabel, MenuItem, Box } from '@mui/material';
import { FormikForm } from '../../components/common'; // Assuming FormikForm component
import * as Yup from 'yup';
import { IPharmacyProduct, ISupplier, IDrugClassification } from '../../data/models'; // Assuming models
import { inventoryService } from '../../services';

interface ProductFormProps {
  initialValues?: IPharmacyProduct;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSuccess, onCancel }) => {
  const [suppliers, setSuppliers] = React.useState<ISupplier[]>([]);
  const [drugClassifications, setDrugClassifications] = React.useState<IDrugClassification[]>([]);

  React.useEffect(() => {
    // TODO: Fetch suppliers and drug classifications from inventoryService
    inventoryService.getSuppliers().then(setSuppliers);
    inventoryService.getDrugClassifications().then(setDrugClassifications);
  }, []);

  const defaultInitialValues: IPharmacyProduct = {
    id: '',
    name: '',
    genericName: '',
    strength: '',
    dosageForm: '',
    unitPrice: 0,
    costPrice: 0,
    stockLevel: 0,
    reorderPoint: 0,
    expiryDate: '',
    batchNumber: '',
    drugClassificationId: '',
    supplierId: '',
    isPrescriptionRequired: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    unitPrice: Yup.number().min(0.01, 'Price must be greater than 0').required('Unit Price is required'),
    stockLevel: Yup.number().min(0, 'Stock cannot be negative').required('Stock Level is required'),
    isPrescriptionRequired: Yup.boolean().required('Prescription Required is required'),
    // TODO: Add more validation rules as needed
  });

  const handleSubmit = async (values: IPharmacyProduct, { setSubmitting }: any) => {
    try {
      if (values.id) {
        // TODO: Call inventoryService.updatePharmacyProduct(values.id, values);
        console.log('Updating product:', values);
      } else {
        // TODO: Call inventoryService.createPharmacyProduct(values);
        console.log('Creating product:', values);
      }
      onSuccess();
    } catch (error) {
      console.error('Failed to save product:', error);
      // TODO: Show error notification
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormikForm
      initialValues={initialValues || defaultInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="name"
          label="Product Name"
          fullWidth
          required
        />
        <TextField
          name="genericName"
          label="Generic Name"
          fullWidth
        />
        <TextField
          name="strength"
          label="Strength"
          fullWidth
        />
        <TextField
          name="dosageForm"
          label="Dosage Form"
          fullWidth
        />
        <TextField
          name="unitPrice"
          label="Unit Price"
          type="number"
          fullWidth
          required
        />
        <TextField
          name="stockLevel"
          label="Stock Level"
          type="number"
          fullWidth
          required
        />
        <TextField
          name="reorderPoint"
          label="Reorder Point"
          type="number"
          fullWidth
        />
        <TextField
          name="expiryDate"
          label="Expiry Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          name="batchNumber"
          label="Batch Number"
          fullWidth
        />
        <TextField
          name="supplierId"
          label="Supplier"
          select
          fullWidth
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="drugClassificationId"
          label="Drug Classification"
          select
          fullWidth
        >
          {drugClassifications.map((classification) => (
            <MenuItem key={classification.id} value={classification.id}>
              {classification.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={<Switch name="isPrescriptionRequired" />}
          label="Prescription Required"
        />
      </Box>
    </FormikForm>
  );
};

export default ProductForm;
