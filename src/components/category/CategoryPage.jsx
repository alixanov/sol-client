// CategoryPage.js
import React from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';

const CategoryPage = ({ category }) => {
  // Mock product data
  const products = [
    { id: 1, name: `${category} Item 1`, usdPrice: 2.99, solPrice: 0.0206 },
    { id: 2, name: `${category} Item 2`, usdPrice: 1.49, solPrice: 0.0103 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontFamily: "'Comic Neue', cursive", mb: 2 }}>
        {category}
      </Typography>
      <Table sx={{ maxWidth: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>USD Price</TableCell>
            <TableCell>SOL Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.usdPrice.toFixed(2)}</TableCell>
              <TableCell>{product.solPrice.toFixed(4)} SOL</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CategoryPage;