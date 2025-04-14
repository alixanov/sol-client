import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import DeleteIcon from '@mui/icons-material/Delete';
import cashierAnimation from '../../assets/deleviry.json';
import { lightBlue } from '@mui/material/colors';

// Colors matching InfoProduct
const colors = {
  primaryGradient: 'linear-gradient(135deg, #0053e3 0%, #7B61FF 100%)', // Blue to purple
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)', // Purple to light purple
  lightBlue: 'linear-gradient(135deg, #7B61FF 0%,rgb(176, 205, 255)   100%)', // Blue to purple
  lightPurple: '#F3E8FF', // Subtle purple (unused here)
  background: '#F5F7FA', // Neutral gray-white
  textPrimary: '#183a57', // Dark blue-gray
  textSecondary: '#FFFFFF', // White for gradients
  shadow: 'rgba(0, 0, 0, 0.1)', // Softer shadow
};

// Styled components
const CartContainer = styled(Box)({
  maxWidth: '100%',
  margin: '40px auto',
  padding: '24px',
  borderRadius: 16,
  minHeight: '100vh',
  '@media (max-width: 960px)': {
    maxWidth: '90%',
    margin: '32px auto',
    padding: '20px',
  },
  '@media (max-width: 768px)': {
    margin: '24px auto',
    padding: '16px',
    borderRadius: 12,
  },
  '@media (max-width: 480px)': {
    padding: '12px',
    margin: '16px auto',
  },
});

const CartCard = styled(Card)({
  background: colors.lightBlue,
  borderRadius: '12px',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  border: `1px solid ${colors.textPrimary}20`,
  display: 'flex',
  alignItems: 'center',
  marginBottom: '12px',
  padding: '12px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    padding: '10px',
  },
});

const CartImage = styled(CardMedia)({
  width: '80px',
  height: '80px',
  objectFit: 'contain',
  borderRadius: '10px',
  marginRight: '12px',
  '@media (max-width: 768px)': {
    marginRight: 0,
    marginBottom: '10px',
  },
});

const CartTitle = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '22px',
  color: colors.textPrimary,
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: colors.primaryGradient.split(' ')[1], // First color of gradient
  },
  '@media (max-width: 768px)': {
    fontSize: '18px',
    textAlign: 'center',
  },
});

const CartText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '16px',
  color: colors.textPrimary,
  '@media (max-width: 768px)': {
    fontSize: '14px',
    textAlign: 'center',
  },
});

const DeleteButton = styled(IconButton)({
  background: colors.primaryGradient,
  color: colors.textSecondary,
  marginLeft: 'auto',
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: colors.secondaryGradient,
    transform: 'scale(1.05)',
  },
  '@media (max-width: 768px)': {
    marginLeft: 0,
    marginTop: '8px',
  },
});

const ClearCartButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '16px',
  background: colors.secondaryGradient,
  color: colors.textSecondary,
  padding: '8px 16px',
  borderRadius: '10px',
  textTransform: 'none',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: colors.primaryGradient,
    transform: 'scale(1.05)',
  },
  '@media (max-width: 768px)': {
    fontSize: '14px',
    padding: '6px 12px',
  },
});

const SellerBubble = styled(Box)({
  position: 'fixed',
  bottom: '32px',
  left: '290px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  '@media (max-width: 960px)': {
    bottom: '24px',
    right: '24px',
  },
  '@media (max-width: 768px)': {
    bottom: '20px',
    right: '20px',
    transform: 'scale(0.8)',
  },
  '@media (max-width: 480px)': {
    bottom: '16px',
    left: '-160px',
    transform: 'scale(0.6)',
  },
});

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  // Remove one item
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.usdPrice * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: '28px',
            color: colors.textPrimary,
            textAlign: 'center',
            mt: 10,
            '@media (max-width: 768px)': { fontSize: '24px' },
            '@media (max-width: 480px)': { fontSize: '20px' },
          }}
        >
          Cart is empty
        </Typography>
        <SellerBubble>
          <Lottie
            animationData={cashierAnimation}
            style={{ width: 240, height: 240 }}
            loop={true}
          />
        </SellerBubble>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Typography
        sx={{
          fontFamily: "'Bubblegum Sans', cursive",
          fontSize: '36px',
          color: colors.textPrimary,
          mb: 3,
          textAlign: 'center',
          '@media (max-width: 768px)': { fontSize: '28px' },
          '@media (max-width: 480px)': { fontSize: '24px' },
        }}
      >
        Your Cart
      </Typography>

      {cartItems.map((item) => (
        <CartCard key={item.id}>
          <Link to={`/product/${item.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <CartImage
              component="img"
              image={item.image}
              alt={item.name}
            />
            <CardContent sx={{ flex: 1, p: 0 }}>
              <CartTitle component="span">{item.name}</CartTitle>
              <CartText>
                Price: ${item.usdPrice.toFixed(2)} × {item.quantity} = ${(item.usdPrice * item.quantity).toFixed(2)}
              </CartText>
            </CardContent>
          </Link>
          <DeleteButton onClick={() => handleRemoveItem(item.id)}>
            <DeleteIcon />
          </DeleteButton>
        </CartCard>
      ))}

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: '22px',
            color: colors.textPrimary,
            mb: 2,
            '@media (max-width: 768px)': { fontSize: '18px' },
          }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <ClearCartButton onClick={handleClearCart}>
          Clear Cart
        </ClearCartButton>
      </Box>

      <SellerBubble>
        <Lottie
          animationData={cashierAnimation}
          style={{ width: 240, height: 240 }}
          loop={true}
        />
      </SellerBubble>
    </CartContainer>
  );
};

export default Cart;