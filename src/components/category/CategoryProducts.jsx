import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, CardContent, CardMedia, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { gsap } from 'gsap';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { shopData } from '../data/ShopData';

const colors = {
  cardBg: '#FFFFFF',
  cardBorder: '#FFD700',
  shadow: 'rgba(0, 0, 0, 0.06)',
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)',
  accent: '#FF6B6B',
  textPrimary: '#183a57',
};

const ProductCard = styled(Card)(({ theme }) => ({
  background: colors.cardBg,
  borderRadius: 16,
  boxShadow: `0 3px 10px ${colors.shadow}`,
  border: `2px dashed ${colors.cardBorder}`,
  position: 'relative',
  overflow: 'visible',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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
    maxWidth: '100%',
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

const CategoryProducts = ({ category, solPrice, setSnackbarMessage, setOpenSnackbar }) => {
  const productRefs = useRef([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Filter products by category or show all
  const products = category && category !== 'All'
    ? shopData.find(cat => cat.category === category)?.products || []
    : shopData.flatMap(cat => cat.products);

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
  }, [products]);

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
      {products.length > 0 ? (
        products.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
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
              <CardContent sx={{
                textAlign: 'center',
                pb: { xs: 3, sm: 4 },
                pt: 0,
                px: { xs: 1, sm: 2 },
              }}>
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
                <PriceTag>
                  ${product.usdPrice.toFixed(2)} / {solPrice ? (product.usdPrice / solPrice).toFixed(4) : '...'} SOL
                </PriceTag>
                <AddToCartButton onClick={(e) => handleAddToCart(product, index, e)}>
                  <AddShoppingCartIcon sx={{ fontSize: { xs: 'small', md: 'medium' } }} />
                </AddToCartButton>
              </CardContent>
            </ProductCard>
          </Grid>
        ))
      ) : (
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: { xs: '16px', sm: '18px', md: '20px' },
            color: colors.textPrimary,
            textAlign: 'center',
            my: 4,
          }}
        >
          Нет продуктов в этой категории
        </Typography>
      )}
    </Grid>
  );
};

export default CategoryProducts;