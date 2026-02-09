// src/scenes/POS/Dispense.tsx
import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid, Paper, List, ListItem, ListItemText, ListItemButton, TextField, Autocomplete, Button } from '@mui/material';
import DrugSearchInput from '../../components/pharmacy/DrugSearchInput';
import { IPharmacyProduct, IPatient, ISaleOrderItem } from '../../data/models';
import { mockProducts, mockPatients } from '../../data/mockData';
import DispensingItemRow from '../../components/pharmacy/DispensingItemRow';
import PaymentModal from './PaymentModal';
import ReceiptModal from './ReceiptModal';
import PermissionGuard from '../../components/common/PermissionGuard';

type SaleDetails = {
  patient: IPatient | null;
  items: ISaleOrderItem[];
  totals: {
    subtotal: number;
    taxAmount: number;
    grandTotal: number;
  };
  payment: {
    method: string;
    amountPaid: number;
  };
};

const DispensePOS: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState<ISaleOrderItem[]>([]);
  const [allProducts] = useState<IPharmacyProduct[]>(mockProducts);
  const [allPatients] = useState<IPatient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [completedSaleDetails, setCompletedSaleDetails] = useState<SaleDetails | null>(null);

  // --- DERIVED STATE & MEMOS ---
  const filteredProducts = useMemo(() => {
    if (!productSearchTerm) {
      return allProducts;
    }
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      p.genericName?.toLowerCase().includes(productSearchTerm.toLowerCase())
    );
  }, [allProducts, productSearchTerm]);

  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const tax = sub * 0.16; // 16% VAT
    const total = sub + tax;
    return { subtotal: sub, taxAmount: tax, grandTotal: total };
  }, [cart]);

  // --- CART LOGIC ---
  const addToCart = (product: IPharmacyProduct) => {
    if (product.stockLevel === 0) return;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
            : item
        );
      } else {
        const newItem: ISaleOrderItem = {
          id: `item_${Date.now()}`,
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.unitPrice,
          totalPrice: product.unitPrice,
          discountAmount: 0,
          netPrice: product.unitPrice,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };
  
  const clearCart = () => {
    setCart([]);
    setSelectedPatient(null);
  };

  const handleConfirmPayment = async (paymentDetails: { method: string; amountPaid: number }) => {
    const saleData: SaleDetails = {
      patient: selectedPatient,
      items: cart,
      totals: { subtotal, taxAmount, grandTotal },
      payment: paymentDetails,
    };
    setCompletedSaleDetails(saleData);
    
    clearCart();
    setIsReceiptModalOpen(true);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Dispense & POS
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* Left Column */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Patient</Typography>
            <Autocomplete
              options={allPatients}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.contactNumber})`}
              value={selectedPatient}
              onChange={(_, newValue) => setSelectedPatient(newValue)}
              renderInput={(params) => <TextField {...params} label="Search Patient" />}
            />
            {selectedPatient && (
              <Box mt={2}>
                 <Typography variant="body1">Selected: <strong>{selectedPatient.firstName} {selectedPatient.lastName}</strong></Typography>
              </Box>
            )}

            <Typography variant="h6" mt={4} gutterBottom>Products</Typography>
            <DrugSearchInput value={productSearchTerm} onChange={setProductSearchTerm} />
            <List sx={{ height: '50vh', overflowY: 'auto', mt: 2 }}>
              {filteredProducts.map(p => (
                <ListItemButton key={p.id} onClick={() => addToCart(p)} disabled={p.stockLevel === 0}>
                  <ListItemText 
                    primary={p.name}
                    secondary={`KSh ${p.unitPrice.toFixed(2)} | Stock: ${p.stockLevel}`}
                    secondaryTypographyProps={{ color: p.stockLevel === 0 ? 'error' : 'text.secondary' }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Middle Column */}
        <Grid item xs={12} md={5} lg={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Dispensing Cart</Typography>
            <Box sx={{ height: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {cart.length > 0 ? (
                cart.map(item => (
                  <DispensingItemRow 
                    key={item.id}
                    item={{ product: allProducts.find(p => p.id === item.productId)!, quantity: item.quantity }}
                    onQuantityChange={updateQuantity} 
                    onRemove={removeFromCart} 
                  />
                ))
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Typography color="text.secondary">Cart is empty. Select products to begin.</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={3} lg={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Sale Summary</Typography>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>KSh {subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography>Tax (VAT 16%):</Typography>
                <Typography>KSh {taxAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, color: 'primary.main' }}>
                <Typography variant="h5" fontWeight="bold">Total:</Typography>
                <Typography variant="h5" fontWeight="bold">KSh {grandTotal.toFixed(2)}</Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <PermissionGuard action="create" subject="SaleOrder">
                <Button variant="contained" color="primary" disabled={cart.length === 0} onClick={() => setIsPaymentModalOpen(true)}>
                  Process Payment
                </Button>
              </PermissionGuard>
              <Button variant="outlined" color="secondary" disabled={cart.length === 0}>Suspend Sale</Button>
              <Button variant="text" color="error" onClick={clearCart} disabled={cart.length === 0}>Clear Cart</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <PaymentModal 
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={grandTotal}
        onConfirm={handleConfirmPayment}
      />

      <ReceiptModal 
        open={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        saleDetails={completedSaleDetails}
      />
    </Box>
  );
};

export default DispensePOS;

