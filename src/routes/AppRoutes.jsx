import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Navbar, Home, Account, Cart ,InfoProduct, Barkery, Dairy, Snack, Drinks, CategoryProducts,Register} from '../components/'; // Latest Navbar component


const RoutesContainer = styled(Box)(({ isMobile }) => ({
  flexGrow: 1,
  padding: isMobile ? '16px' : '24px',
  marginLeft: isMobile ? 0 : '260px', // Matches Navbar width
  marginBottom: isMobile ? '60px' : 0, // Matches mobile footer height
  minHeight: '100vh',
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE/Edge
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome/Safari
  },
}));

const AppRoutes = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar isMobile={isMobile} />
      <RoutesContainer isMobile={isMobile}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bakery" element={<Barkery category="Bakery" />} />
          <Route path="/dairy" element={<Dairy category="Dairy" />} />
          <Route path="/snacks" element={<Snack category="Snacks" />} />
          <Route path="/drinks" element={<Drinks category="Drinks" />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} /> {/* Add the new route */}



          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product/:id" element={<InfoProduct />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </RoutesContainer>
    </Box>
  );
};

export default AppRoutes;