import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import Lottie from 'lottie-react';
import DeleteIcon from '@mui/icons-material/Delete';
import cashierAnimation from '../../assets/deleviry.json';

// Определяем цвета, чтобы они совпадали с InfoProduct
const colors = {
  primaryGradient: 'linear-gradient(135deg, #FF3D00 0%, #FF8A65 100%)',
  secondaryGradient: 'linear-gradient(135deg, #00B7D4 0%, #3F51B5 100%)',
  accent: '#FFD700',
  background: 'linear-gradient(180deg, #FFE082 0%, #F06292 100%)',
  textPrimary: '#183a57',
  textSecondary: '#FFFFFF',
  cloudBg1: 'linear-gradient(135deg, #F50057 0%, #FF4081 100%)',
  cloudBg2: 'linear-gradient(135deg, #00E676 0%, #69F0AE 100%)',
  shadow: 'rgba(0, 0, 0, 0.2)',
};

// Стилизованные компоненты
const CartContainer = styled(Box)({
  maxWidth: '1000px',
  margin: '40px auto',
  padding: '32px',
  borderRadius: 24,
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100vh',
  '@media (max-width: 960px)': {
    maxWidth: '90%',
    margin: '32px auto',
    padding: '24px',
  },
  '@media (max-width: 768px)': {
    margin: '24px auto',
    padding: '16px',
    borderRadius: 16,
  },
  '@media (max-width: 480px)': {
    padding: '12px',
    margin: '16px auto',
  },
});

const CartCard = styled(Card)({
  background: colors.cloudBg1,
  borderRadius: '16px',
  boxShadow: `0 4px 12px ${colors.shadow}`,
  border: `2px solid ${colors.accent}`,
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  padding: '16px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    padding: '12px',
  },
});

const CartImage = styled(CardMedia)({
  width: '100px',
  height: '100px',
  objectFit: 'contain',
  borderRadius: '12px',
  marginRight: '16px',
  '@media (max-width: 768px)': {
    marginRight: 0,
    marginBottom: '12px',
  },
});

const CartTitle = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '24px',
  color: colors.textSecondary,
  '@media (max-width: 768px)': {
    fontSize: '20px',
    textAlign: 'center',
  },
});

const CartText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  color: colors.textSecondary,
  '@media (max-width: 768px)': {
    fontSize: '16px',
    textAlign: 'center',
  },
});

const DeleteButton = styled(IconButton)({
  background: colors.primaryGradient,
  color: colors.textSecondary,
  marginLeft: 'auto',
  '&:hover': {
    background: colors.primaryGradient,
    transform: 'scale(1.1)',
  },
  '@media (max-width: 768px)': {
    marginLeft: 0,
    marginTop: '8px',
  },
});

const ClearCartButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  background: colors.secondaryGradient,
  color: colors.textSecondary,
  padding: '10px 20px',
  borderRadius: '12px',
  textTransform: 'none',
  boxShadow: `0 4px 10px ${colors.shadow}`,
  '&:hover': {
    background: colors.secondaryGradient,
    transform: 'scale(1.05)',
    boxShadow: `0 6px 14px ${colors.shadow}`,
  },
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '8px 16px',
  },
});

const SellerBubble = styled(Box)({
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  '@media (max-width: 960px)': {
    bottom: '32px',
    right: '32px',
  },
  '@media (max-width: 768px)': {
    bottom: '24px',
    right: '24px',
    transform: 'scale(0.9)',
  },
  '@media (max-width: 480px)': {
    bottom: '16px',
    right: '16px',
    transform: 'scale(0.7)',
  },
});

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  // Удаление одного товара
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Очистка всей корзины
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  // Подсчёт общей стоимости
  const totalPrice = cartItems.reduce((total, item) => total + item.usdPrice * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: '32px',
            color: colors.textPrimary,
            textAlign: 'center',
            mt: 10,
          }}
        >
          Корзина пуста
        </Typography>
        <SellerBubble>
          <Lottie
            animationData={cashierAnimation}
            style={{ width: 320, height: 320 }}
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
          fontSize: '40px',
          color: colors.textPrimary,
          mb: 4,
          textAlign: 'center',
        }}
      >
        Ваша корзина
      </Typography>

      {cartItems.map((item) => (
        <CartCard key={item.id} className="cart-card">
          <CartImage
            component="img"
            image={item.image}
            alt={item.name}
          />
          <CardContent sx={{ flex: 1, p: 0 }}>
            <CartTitle>{item.name}</CartTitle>
            <CartText>
              Цена: ${item.usdPrice.toFixed(2)} × {item.quantity} = ${(item.usdPrice * item.quantity).toFixed(2)}
            </CartText>
          </CardContent>
          <DeleteButton onClick={() => handleRemoveItem(item.id)}>
            <DeleteIcon />
          </DeleteButton>
        </CartCard>
      ))}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: '24px',
            color: colors.textPrimary,
            mb: 2,
          }}
        >
          Итого: ${totalPrice.toFixed(2)}
        </Typography>
        <ClearCartButton onClick={handleClearCart}>
          Очистить корзину
        </ClearCartButton>
      </Box>

      <SellerBubble>
        <Lottie
          animationData={cashierAnimation}
          style={{ width: 320, height: 320 }}
          loop={true}
        />
      </SellerBubble>
    </CartContainer>
  );
};

export default Cart;