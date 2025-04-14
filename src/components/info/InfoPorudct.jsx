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
  primaryGradient: 'linear-gradient(135deg, #0053e3 0%, #7B61FF 100%)', // Blue to purple
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)', // Purple to light purple
  lightBlue: '#E0F7FA', // Subtle blue for price, buttons
  lightPurple: '#F3E8FF', // Subtle purple for featured
  background: '#F5F7FA', // Neutral gray-white background
  textPrimary: '#183a57', // Dark blue-gray for contrast
  textSecondary: '#FFFFFF', // White for text on gradients
  shadow: 'rgba(0, 0, 0, 0.1)', // Softer shadow
};

const ProductContainer = styled(Box)({
  maxWidth: '100%',
  margin: '40px auto',
  padding: '24px',
  borderRadius: 16,
  position: 'relative',
  minHeight: '100vh',
  // boxShadow: `0 4px 8px ${colors.shadow}`,
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

const CloudCard = styled(Box)(({ type }) => ({
  background:
    type === 'primary' ? colors.primaryGradient :
      type === 'secondary' ? colors.secondaryGradient :
        type === 'tertiary' ? colors.lightBlue :
          colors.lightPurple,
  borderRadius: '16px',
  padding: '16px 24px',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  position: 'relative',
  zIndex: 2,
  margin: '16px 0',
  border: `1px solid ${colors.textPrimary}20`,
  maxWidth: '550px',
  width: '100%',
  opacity: 0,
  transform: 'translateY(20px)',
  '@media (max-width: 768px)': {
    padding: '12px 20px',
    borderRadius: '12px',
    maxWidth: '90%',
    margin: '12px auto',
  },
  '@media (max-width: 480px)': {
    padding: '10px 16px',
    borderRadius: '10px',
    maxWidth: '100%',
  },
}));

const ProductImage = styled(CardMedia)({
  height: 260,
  objectFit: 'contain',
  borderRadius: 12,
  margin: '24px auto',
  border: `1px solid ${colors.textPrimary}20`,
  boxShadow: `0 4px 8px ${colors.shadow}`,
  maxWidth: '300px',
  '@media (max-width: 960px)': {
    height: 220,
    maxWidth: '260px',
  },
  '@media (max-width: 768px)': {
    height: 180,
    maxWidth: '220px',
  },
  '@media (max-width: 480px)': {
    height: 140,
    maxWidth: '160px',
    margin: '16px auto',
  },
});

const ProductTitle = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '36px',
  fontWeight: 400,
  color: colors.textSecondary,
  textAlign: 'center',
  marginBottom: '16px',
  '@media (max-width: 768px)': {
    fontSize: '28px',
  },
  '@media (max-width: 480px)': {
    fontSize: '22px',
    marginBottom: '12px',
  },
});

const ProductText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  color: colors.textSecondary,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
  '@media (max-width: 480px)': {
    fontSize: '14px',
  },
});

const NutritionInfo = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  '@media (max-width: 480px)': {
    gap: '6px',
  },
});

const NutritionChip = styled(Chip)({
  background: colors.lightBlue,
  color: colors.textPrimary,
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '13px',
  borderRadius: '10px',
  padding: '4px 8px',
  '@media (max-width: 768px)': {
    fontSize: '12px',
  },
  '@media (max-width: 480px)': {
    fontSize: '11px',
    padding: '3px 6px',
  },
});

const AvailabilityChip = styled(Chip)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '15px',
  borderRadius: '10px',
  padding: '4px 8px',
  background: colors.lightBlue,
  color: colors.textPrimary,
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
  '@media (max-width: 480px)': {
    fontSize: '12px',
    padding: '3px 6px',
  },
});

const FeaturedText = styled(Typography)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '20px',
  color: colors.textPrimary,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '18px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
  },
});

const SellerBubble = styled(Box)({
  position: 'fixed',
  bottom: '32px',
  right: '32px',
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
    left: '-190px',
    transform: 'scale(0.6)',
  },
});

const BackButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  color: colors.textPrimary,
  background: colors.lightBlue,
  borderRadius: '12px',
  padding: '8px 16px',
  textTransform: 'none',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  position: 'absolute',
  top: '24px',
  left: '24px',
  zIndex: 3,
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: colors.secondaryGradient,
    color: colors.textSecondary,
    transform: 'scale(1.05)',
  },
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '6px 12px',
    top: '20px',
    left: '20px',
  },
  '@media (max-width: 480px)': {
    fontSize: '14px',
    padding: '5px 10px',
    top: '16px',
    left: '16px',
  },
});

const AddToCartButton = styled(Button)({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '18px',
  background: colors.lightBlue,
  color: colors.textPrimary,
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  transition: 'background 0.3s ease, transform 0.3s ease',
  '&:hover': {
    background: colors.secondaryGradient,
    color: colors.textSecondary,
    transform: 'scale(1.05)',
  },
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '10px 20px',
  },
  '@media (max-width: 480px)': {
    fontSize: '14px',
    padding: '8px 16px',
  },
});

const CustomSnackbar = styled(SnackbarContent)({
  background: colors.lightPurple,
  border: `1px solid ${colors.textPrimary}20`,
  borderRadius: '12px',
  padding: '10px 20px',
  boxShadow: `0 4px 8px ${colors.shadow}`,
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '16px',
  color: colors.textPrimary,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    fontSize: '14px',
    padding: '8px 16px',
  },
  '@media (max-width: 480px)': {
    fontSize: '12px',
    padding: '6px 12px',
  },
});

const InfoProduct = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const cloudRefs = useRef([]);
  const snackbarRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Find product
  const product = shopData
    .flatMap(category => category.products)
    .find(product => product.id === productId);

  // Cloud animation
  useEffect(() => {
    cloudRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.3,
          }
        );
      }
    });
  }, [product]);

  // Snackbar animation
  useEffect(() => {
    if (openSnackbar && snackbarRef.current) {
      gsap.fromTo(
        snackbarRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [openSnackbar]);

  // Add to cart handler
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
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
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
          Back
        </BackButton>
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
          Oops! Product not found!
        </Typography>
      </ProductContainer>
    );
  }

  return (
    <ProductContainer>
      <BackButton component={Link} to="/" startIcon={<ArrowBackIcon />}>
        Back
      </BackButton>

      <ProductImage
        component="img"
        image={product.image}
        alt={product.name}
        ref={(el) => (cloudRefs.current[0] = el)}
      />

      <Box sx={{ maxWidth: '650px', mx: 'auto', mt: 4 }}>
        <CloudCard type="primary" ref={(el) => (cloudRefs.current[1] = el)}>
          <ProductTitle>{product.name}</ProductTitle>
        </CloudCard>

        <CloudCard type="secondary" ref={(el) => (cloudRefs.current[2] = el)}>
          <ProductText>{product.description}</ProductText>
        </CloudCard>

        <CloudCard type="tertiary" ref={(el) => (cloudRefs.current[3] = el)}>
          <ProductText>Price: ${product.usdPrice.toFixed(2)}</ProductText>
        </CloudCard>

        <CloudCard type="primary" ref={(el) => (cloudRefs.current[4] = el)}>
          <NutritionInfo>
            <NutritionChip label={`Calories: ${product.nutrition.calories}`} />
            <NutritionChip label={`Protein: ${product.nutrition.protein}`} />
            <NutritionChip label={`Carbs: ${product.nutrition.carbs}`} />
            <NutritionChip label={`Fat: ${product.nutrition.fat}`} />
          </NutritionInfo>
        </CloudCard>

        <CloudCard type="secondary" ref={(el) => (cloudRefs.current[5] = el)}>
          <AvailabilityChip
            label={product.availability === 'available' ? 'In Stock' : 'Out of Stock'}
            color={product.availability === 'available' ? 'success' : 'error'}
          />
        </CloudCard>

        {product.featured && (
          <CloudCard type="featured" ref={(el) => (cloudRefs.current[6] = el)}>
            <FeaturedText>{product.featured}</FeaturedText>
          </CloudCard>
        )}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
        <AddToCartButton
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          ref={(el) => (cloudRefs.current[7] = el)}
        >
          Add to Cart
        </AddToCartButton>
      </Box>

      <SellerBubble>
        <Lottie
          animationData={cashierAnimation}
          style={{ width: 240, height: 240 }}
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
          message={`${product.name} added to cart!`}
        />
      </Snackbar>
    </ProductContainer>
  );
};

export default InfoProduct;