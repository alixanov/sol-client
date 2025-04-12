// Cart.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Cart = () => (
  <Box>
    <Typography variant="h4" sx={{ fontFamily: "'Comic Neue', cursive", mb: 2 }}>
      Your Cart
    </Typography>
    <Typography>Items you’ve added will appear here.</Typography>
  </Box>
);

export default Cart;