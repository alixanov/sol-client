import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  SnackbarContent,
  Slide,
} from '@mui/material';
import { gsap } from 'gsap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { shopData } from '../../components/data/ShopData';

const colors = {
  primaryGradient: 'linear-gradient(135deg, #00C4B4 0%, #7B61FF 100%)',
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)',
  accent: '#FF6B6B',
  background: '#F8FAFC',
  textPrimary: '#183a57',
  textSecondary: '#D1D5DB',
  cardBg: '#FFFFFF',
  cardBorder: '#FFD700',
  shadow: 'rgba(0, 0, 0, 0.06)',
};

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '32px',
  fontWeight: 400,
  color: colors.textPrimary,
  margin: '40px 0 24px',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    margin: '20px 0 12px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '28px',
    margin: '30px 0 18px',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: `0 3px 10px ${colors.shadow}`,
  border: `2px dashed ${colors.cardBorder}`,
  position: 'relative',
  overflow: 'visible',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  width: '240px', // Фиксированная максимальная ширина для одинакового размера
  margin: '0 auto', // Центрирование карточки внутри Grid
  background: colors.cardBg,
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 8px 20px ${colors.shadow}`,
    '& .product-image': {
      transform: 'scale(1.2) rotate(3deg)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: 12,
    border: `1.5px dashed ${colors.cardBorder}`,
    maxWidth: '200px', // Меньшая ширина для мобильных
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 120,
  objectFit: 'contain',
  margin: '16px auto',
  transition: 'transform 0.4s ease',
  [theme.breakpoints.down('sm')]: {
    height: 100,
    margin: '12px auto',
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  background: colors.secondaryGradient,
  color: colors.textPrimary,
  padding: '6px 12px',
  borderRadius: 10,
  fontSize: '13px',
  fontWeight: 500,
  textAlign: 'center',
  margin: '8px auto 12px',
  width: 'fit-content',
  boxShadow: `0 1px 4px ${colors.shadow}`,
  [theme.breakpoints.down('sm')]: {
    padding: '4px 10px',
    fontSize: '12px',
    borderRadius: 8,
    margin: '4px auto 8px',
  },
}));

const AddToCartButton = styled(IconButton)(({ theme }) => ({
  background: colors.accent,
  color: '#FFFFFF',
  padding: 8,
  position: 'absolute',
  bottom: '-16px',
  right: '16px',
  boxShadow: `0 2px 6px ${colors.shadow}`,
  transition: 'transform 0.2s ease',
  '&:hover': {
    background: colors.accent,
    transform: 'scale(1.15)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: 6,
    bottom: '-12px',
    right: '12px',
  },
}));

const CustomSnackbar = styled(SnackbarContent)(({ theme }) => ({
  background: colors.secondaryGradient,
  border: `3px solid ${colors.cardBorder}`,
  borderRadius: '16px',
  padding: '12px 24px',
  boxShadow: `0 6px 16px ${colors.shadow}`,
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  color: '#FFFFFF',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '10px 20px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '14px',
    padding: '8px 16px',
  },
}));

const Drinks = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const productRefs = useRef([]);
  const snackbarRef = useRef(null);
  const navigate = useNavigate();

  const bakeryProducts = shopData
    .find(category => category.category === 'Drinks')
    ?.products || [];

  useEffect(() => {
    productRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { scale: 0.7, opacity: 0, rotation: 5 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            delay: index * 0.2,
            ease: 'back.out(2)',
          }
        );
      }
    });
  }, [bakeryProducts]);

  useEffect(() => {
    if (openSnackbar && snackbarRef.current) {
      gsap.fromTo(
        snackbarRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [openSnackbar]);

  const handleAddToCart = (product, index, e) => {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        usdPrice: product.usdPrice,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setSnackbarMessage(`${product.name} добавлен в корзину!`);
    setOpenSnackbar(true);

    const ref = productRefs.current[index];
    if (ref) {
      gsap.to(ref, {
        scale: 1.1,
        y: -10,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Box sx={{
      maxWidth: '1280px',
      mx: 'auto',
      px: { xs: 1.5, sm: 2, md: 3 },
      py: { xs: 2, sm: 3, md: 4 },
      // background: colors.background,
    }}>
      <SectionTitle>Пекарня</SectionTitle>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="start" // Центрирование карточек
        alignItems="stretch"
      >
        {bakeryProducts.length > 0 ? (
          bakeryProducts.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={product.id}
              sx={{
                display: 'flex',
                justifyContent: 'center', // Центрирование карточки внутри ячейки
              }}
            >
              <ProductCard
                ref={(el) => (productRefs.current[index] = el)}
                className={`product-card product-card-${product.id}`}
                onClick={() => handleProductClick(product.id)}
              >
                <ProductImage
                  component="img"
                  image={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <CardContent
                  sx={{
                    textAlign: 'center',
                    pb: { xs: 3, sm: 4 },
                    pt: 0,
                    px: { xs: 1, sm: 2 },
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Bubblegum Sans', cursive",
                      fontSize: { xs: '16px', sm: '17px', md: '18px' },
                      color: colors.textPrimary,
                      mb: { xs: 0.5, sm: 1 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <PriceTag>
                      ${product.usdPrice.toFixed(2)}
                    </PriceTag>
                  </Box>
                </CardContent>
                <AddToCartButton onClick={(e) => handleAddToCart(product, index, e)}>
                  <AddShoppingCartIcon sx={{ fontSize: { xs: 'small', md: 'medium' } }} />
                </AddToCartButton>
              </ProductCard>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              fontFamily: "'Bubblegum Sans', cursive",
              fontSize: '24px',
              color: colors.textPrimary,
              textAlign: 'center',
              mt: 4,
            }}
          >
            Нет продуктов в категории Пекарня!
          </Typography>
        )}
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'down' }}
      >
        <CustomSnackbar
          ref={snackbarRef}
          message={snackbarMessage}
        />
      </Snackbar>
    </Box>
  );
};

export default Drinks;