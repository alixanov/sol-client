import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, CardMedia, Chip, Snackbar, SnackbarContent, Slide } from '@mui/material';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cashierAnimation from '../../assets/animation.json';
import { shopData } from '../../components/data/ShopData';

const colors = {
  primaryGradient: 'linear-gradient(135deg, #FF3D00 0%, #FF8A65 100%)',
  secondaryGradient: 'linear-gradient(135deg, #00B7D4 0%, #3F51B5 100%)',
  accent: '#FFD700',
  background: 'linear-gradient(180deg, #FFE082 0%, #F06292 100%)',
  textPrimary: '#183a57',
  textSecondary: '#FFFFFF',
  cloudBg1: 'linear-gradient(135deg, #F50057 0%, #FF4081 100%)',
  cloudBg2: 'linear-gradient(135deg, #00E676 0%, #69F0AE 100%)',
  cloudBg3: 'linear-gradient(135deg, #FFAB00 0%, #FFD740 100%)',
  shadow: 'rgba(0, 0, 0, 0.2)',
};

const ProductContainer = styled(Box)({
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
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-60px',
    left: '-60px',
    width: '220px',
    height: '220px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
    borderRadius: '50%',
    opacity: 0.5,
    zIndex: 0,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-70px',
    right: '-70px',
    width: '280px',
    height: '280px',
    background: 'radial-gradient(circle, rgba(255,215,0,0.4), transparent)',
    borderRadius: '50%',
    opacity: 0.4,
    zIndex: 0,
  },
});

const CloudCard = styled(Box)(({ type }) => ({
  background: type === 'primary' ? colors.cloudBg1 : type === 'secondary' ? colors.cloudBg2 : colors.cloudBg3,
  borderRadius: '24px',
  padding: '20px 28px',
  boxShadow: `0 6px 16px ${colors.shadow}`,
  position: 'relative',
  zIndex: 2,
  margin: '20px 0',
  border: `3px solid ${colors.accent}`,
  maxWidth: '550px',
  width: '100%',
  opacity: 0,
  transform: 'translateY(50px)',
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: '-18px',
    left: '40px',
    width: '35px',
    height: '35px',
    background: 'inherit',
    borderRadius: '50%',
    border: `2px solid ${colors.accent}`,
    transform: 'rotate(45deg)',
    zIndex: -1,
  },
  '@media (max-width: 768px)': {
    padding: '16px 20px',
    borderRadius: '20px',
    maxWidth: '90%',
    margin: '16px auto',
  },
  '@media (max-width: 480px)': {
    padding: '12px 16px',
    borderRadius: '16px',
    maxWidth: '100%',
  },
}));

const ProductImage = styled(CardMedia)({
  height: 280,
  objectFit: 'contain',
  borderRadius: 20,
  margin: '32px auto',
  border: `4px solid ${colors.accent}`,
  boxShadow: `0 6px 16px ${colors.shadow}`,
  maxWidth: '320px',
  '@media (max-width: 960px)': {
    height: 240,
    maxWidth: '280px',
  },
  '@media (max-width: 768px)': {
    height: 200,
    maxWidth: '240px',
  },
  '@media (max-width: 480px)': {
    height: 160,
    maxWidth: '180px',
    margin: '24px auto',
  },
});

const ProductTitle = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '40px',
  fontWeight: 400,
  color: colors.textSecondary,
  textAlign: 'center',
  textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    fontSize: '32px',
  },
  '@media (max-width: 480px)': {
    fontSize: '24px',
    marginBottom: '16px',
  },
});

const ProductText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '20px',
  color: colors.textSecondary,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '18px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
  },
});

const NutritionInfo = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
  '@media (max-width: 480px)': {
    gap: '8px',
  },
});

const NutritionChip = styled(Chip)({
  background: colors.primaryGradient,
  color: colors.textSecondary,
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '14px',
  borderRadius: '12px',
  padding: '6px 10px',
  '@media (max-width: 768px)': {
    fontSize: '13px',
  },
  '@media (max-width: 480px)': {
    fontSize: '12px',
    padding: '4px 8px',
  },
});

const AvailabilityChip = styled(Chip)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '16px',
  borderRadius: '12px',
  padding: '6px 10px',
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
  '@media (max-width: 480px)': {
    fontSize: '13px',
    padding: '4px 8px',
  },
});

const FeaturedText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '22px',
  color: colors.textSecondary,
  textAlign: 'center',
  fontStyle: 'italic',
  textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
  '@media (max-width: 768px)': {
    fontSize: '20px',
  },
  '@media (max-width: 480px)': {
    fontSize: '18px',
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

const BackButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '20px',
  color: colors.textSecondary,
  background: colors.cloudBg1,
  borderRadius: '14px',
  padding: '10px 20px',
  textTransform: 'none',
  boxShadow: `0 4px 10px ${colors.shadow}`,
  position: 'absolute',
  top: '32px',
  left: '32px',
  zIndex: 3,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    background: colors.cloudBg1,
    transform: 'scale(1.15)',
    boxShadow: `0 6px 14px ${colors.shadow}`,
  },
  '@media (max-width: 768px)': {
    fontSize: '18px',
    padding: '8px 16px',
    top: '24px',
    left: '24px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
    padding: '6px 12px',
    top: '16px',
    left: '16px',
  },
});

const AddToCartButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '20px',
  background: colors.cloudBg2,
  color: colors.textSecondary,
  padding: '14px 28px',
  borderRadius: '16px',
  textTransform: 'none',
  boxShadow: `0 4px 12px ${colors.shadow}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    background: colors.cloudBg2,
    transform: 'scale(1.15)',
    boxShadow: `0 6px 16px rgba(0, 230, 118, 0.4)`,
  },
  '@media (max-width: 768px)': {
    fontSize: '18px',
    padding: '12px 24px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
    padding: '10px 20px',
  },
});

const CustomSnackbar = styled(SnackbarContent)({
  background: colors.cloudBg3,
  border: `3px solid ${colors.accent}`,
  borderRadius: '16px',
  padding: '12px 24px',
  boxShadow: `0 6px 16px ${colors.shadow}`,
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  color: colors.textSecondary,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '10px 20px',
  },
  '@media (max-width: 480px)': {
    fontSize: '14px',
    padding: '8px 16px',
  },
});

const InfoProduct = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const cloudRefs = useRef([]);
  const snackbarRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Находим продукт
  const product = shopData
    .flatMap(category => category.products)
    .find(product => product.id === productId);

  // Анимация облаков
  useEffect(() => {
    cloudRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: index * 0.5,
            onComplete: () => {
              gsap.to(ref, {
                rotation: 2,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
              });
            },
          }
        );
      }
    });
  }, [product]);

  // Анимация Snackbar
  useEffect(() => {
    if (openSnackbar && snackbarRef.current) {
      gsap.fromTo(
        snackbarRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [openSnackbar]);

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (!product) return;

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

    setOpenSnackbar(true);

    gsap.to(cloudRefs.current[7], {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
    });

    console.log(`Added ${product.name} to cart`, cart);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!product) {
    return (
      <ProductContainer>
        <BackButton component={Link} to="/" startIcon={<ArrowBackIcon />}>
          Назад
        </BackButton>
        <Typography
          sx={{
            fontFamily: "'Bubblegum Sans', cursive",
            fontSize: '32px',
            color: colors.textSecondary,
            textAlign: 'center',
            mt: 10,
            textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
            '@media (max-width: 768px)': { fontSize: '28px' },
            '@media (max-width: 480px)': { fontSize: '24px' },
          }}
        >
          Ой! Продукт не найден!
        </Typography>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <BackButton component={Link} to="/" startIcon={<ArrowBackIcon />}>
        Назад
      </BackButton>

      <ProductImage
        component="img"
        image={product.image}
        alt={product.name}
        ref={(el) => (cloudRefs.current[0] = el)}
      />

      <Box sx={{ maxWidth: '650px', mx: 'auto', mt: 5 }}>
        <CloudCard type="primary" ref={(el) => (cloudRefs.current[1] = el)}>
          <ProductTitle>{product.name}</ProductTitle>
        </CloudCard>

        <CloudCard type="secondary" ref={(el) => (cloudRefs.current[2] = el)}>
          <ProductText>{product.description}</ProductText>
        </CloudCard>

        <CloudCard type="tertiary" ref={(el) => (cloudRefs.current[3] = el)}>
          <ProductText>Цена: ${product.usdPrice.toFixed(2)}</ProductText>
        </CloudCard>

        <CloudCard type="primary" ref={(el) => (cloudRefs.current[4] = el)}>
          <NutritionInfo>
            <NutritionChip label={`Калории: ${product.nutrition.calories}`} />
            <NutritionChip label={`Белки: ${product.nutrition.protein}`} />
            <NutritionChip label={`Углеводы: ${product.nutrition.carbs}`} />
            <NutritionChip label={`Жиры: ${product.nutrition.fat}`} />
          </NutritionInfo>
        </CloudCard>

        <CloudCard type="secondary" ref={(el) => (cloudRefs.current[5] = el)}>
          <AvailabilityChip
            label={product.availability === 'available' ? 'В наличии' : 'Нет в наличии'}
            color={product.availability === 'available' ? 'success' : 'error'}
          />
        </CloudCard>

        {product.featured && (
          <CloudCard type="tertiary" ref={(el) => (cloudRefs.current[6] = el)}>
            <FeaturedText>{product.featured}</FeaturedText>
          </CloudCard>
        )}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 5, mb: 8 }}>
        <AddToCartButton
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          ref={(el) => (cloudRefs.current[7] = el)}
        >
          Добавить в корзину
        </AddToCartButton>
      </Box>

      <SellerBubble>
        <Lottie
          animationData={cashierAnimation}
          style={{ width: 320, height: 320 }}
          loop={true}
        />
      </SellerBubble>

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
          message={`${product.name} добавлен в корзину!`}
        />
      </Snackbar>
    </ProductContainer>
  );
};

export default InfoProduct;