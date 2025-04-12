import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { gsap } from 'gsap';
import axios from 'axios';
import Lottie from 'lottie-react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Cashier animation
import cashierAnimation from '../../assets/animation.json';

// Mock shop data
import { shopData } from '../../components/data/ShopData';

const colors = {
  primaryGradient: 'linear-gradient(135deg, #00C4B4 0%, #7B61FF 100%)',
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)', // Vibrant purple
  accent: '#FF6B6B', // Playful coral for CTAs
  background: '#F8FAFC', // Clean, soft background
  textPrimary: '#183a57', // Dark blue (used elsewhere)
  textSecondary: '#D1D5DB', // Light gray
  cardBg: '#FFFFFF', // Pure white cards
  cardBorder: '#FFD700', // Golden doodle-like border
  shadow: 'rgba(0, 0, 0, 0.06)',
};

const HeroSection = styled(Box)({
  background: colors.primaryGradient,
  padding: '64px 32px',
  borderRadius: 24,
  textAlign: 'center',
  margin: '0 auto 48px',
  maxWidth: '1280px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 6px 20px ${colors.shadow}`,
  border: `3px solid ${colors.cardBorder}`,
  opacity: 0,
  '&.visible': {
    opacity: 1,
    transition: 'opacity 0.8s ease-in',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-50px',
    left: '-50px',
    width: '150px',
    height: '150px',
    background: colors.secondaryGradient,
    borderRadius: '50%',
    opacity: 0.3,
    zIndex: 0,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-60px',
    right: '-60px',
    width: '180px',
    height: '180px',
    background: colors.accent,
    borderRadius: '50%',
    opacity: 0.2,
    zIndex: 0,
  },
  '@media (max-width: 768px)': {
    padding: '48px 16px',
    borderRadius: 16,
    margin: '0 auto 32px',
    maxWidth: '100%',
  },
});

const Slogan = styled(Typography)({
  
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '40px',
  fontWeight: 400,
  color: '#FFFFFF', // White for contrast
  marginBottom: '66px',
  lineHeight: 1.2,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  zIndex: 2,
  '@media (max-width: 768px)': {
    fontSize: '28px',
  },
});

const CashierBubble = styled(Box)({
  position: 'absolute',
  bottom: '48px',
  left: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  padding: '16px',
  maxWidth: 320,
  width: '100%',
  zIndex: 1,
  '@media (max-width: 768px)': {
    position: 'static',
    margin: '32px auto 24px',
    maxWidth: 280,
  },
});

const SOLTicker = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: '#FFFFFF', // White for clarity
  padding: '8px 16px',
  borderRadius: 12,
  boxShadow: `0 2px 8px ${colors.shadow}`,
  margin: '16px auto',
  border: `1px solid ${colors.cardBorder}`,
  zIndex: 1,
});

const ShopButton = styled(Button)({
  background: colors.accent,
  color: '#FFFFFF', // White for contrast
  fontSize: '18px',
  padding: '6px 16px',
  marginLeft:10,
  borderRadius: 16,
  textTransform: 'none',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  boxShadow: `0 4px 12px ${colors.shadow}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    background: colors.accent,
    transform: 'scale(1.05)',
    boxShadow: `0 6px 16px rgba(255, 107, 107, 0.4)`,
  },
  '@media (max-width: 768px)': {
    fontSize: '16px',
    padding: '10px 24px',
  },
});

const CategoryItem = styled(Box)({
  textAlign: 'center',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const SectionTitle = styled(Typography)({
  marginTop:"-50px",
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '32px',
  fontWeight: 400,
  color: colors.textPrimary,
  margin: '40px 0 24px',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  '@media (max-width: 768px)': {
    fontSize: '24px',
    margin: '24px 0 16px',
  },
});

const ProductCard = styled(Card)({
  background: colors.cardBg,
  borderRadius: 16,
  boxShadow: `0 3px 10px ${colors.shadow}`,
  border: `2px dashed ${colors.cardBorder}`,
  position: 'relative',
  overflow: 'visible',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 8px 20px ${colors.shadow}`,
    '& .product-image': {
      transform: 'scale(1.2) rotate(3deg)',
    },
  },
  '@media (max-width: 768px)': {
    borderRadius: 12,
  },
});

const ProductImage = styled(CardMedia)({
  height: 120,
  objectFit: 'contain',
  margin: '16px auto',
  transition: 'transform 0.4s ease',
});

const PriceTag = styled(Box)({
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
});

const AddToCartButton = styled(IconButton)({
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
});

const Home = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [priceTrend, setPriceTrend] = useState(null);
  const [cashierMessage, setCashierMessage] = useState('');
  const heroRef = useRef(null);
  const productRefs = useRef([]);

  // Featured products (limited to 4 for static display)
  const featuredProducts = [
    ...(shopData.find(category => category.category === 'Bakery')?.products || []).slice(0, 2),
    ...(shopData.find(category => category.category === 'Dairy')?.products || []).slice(0, 1),
    ...(shopData.find(category => category.category === 'Snacks')?.products || []).slice(0, 1),
  ].slice(0, 4);

  const messages = [
    'SOL — это весело и вкусно!',
    'Хватай мультяшные вкусняшки!',
    'Цены такие же яркие, как SOL!',
    'Давай за покупками!',
  ];

  // Fetch SOL price
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        const currentPrice = response.data.solana.usd;
        setSolPrice(currentPrice);
        setPriceTrend(currentPrice > 145 ? 'up' : 'down');
      } catch (error) {
        console.error('Failed to fetch SOL price:', error);
        setSolPrice(145.32);
      }
    };
    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Rotate cashier messages
  useEffect(() => {
    const updateMessage = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCashierMessage(randomMessage);
      gsap.fromTo(
        '.cashier-message',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    };
    updateMessage();
    const messageInterval = setInterval(updateMessage, 5000);
    return () => clearInterval(messageInterval);
  }, []);

  // Animate hero and products
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('visible');
      gsap.fromTo(
        heroRef.current.querySelector('.slogan'),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        heroRef.current.querySelector('.shop-button'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );
    }
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
  }, []);

  const handleAddToCart = (product, index) => {
    console.log(`Added ${product.name} to cart`);
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

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', px: { xs: 2, md: 3 }, py: 4, marginBottom: { xs: '60px', md: 0 } }}>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Slogan className="slogan">CartoonCart — твой SOL-вкусный мир!</Slogan>
        <SOLTicker>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: '#000000' }}>
            1 SOL = ${solPrice ? solPrice.toFixed(2) : '...'}
            {priceTrend === 'up' ? (
              <TrendingUpIcon sx={{ color: colors.accent, fontSize: '18px', ml: 1 }} />
            ) : (
              <TrendingDownIcon sx={{ color: '#FF5252', fontSize: '18px', ml: 1 }} />
            )}
          </Typography>
        </SOLTicker>
        <ShopButton component={Link} to="/shop" className="shop-button">
          В магазин!
        </ShopButton>
        <CashierBubble>
          <Lottie
            animationData={cashierAnimation}
            style={{ width: 160, height: 160, margin: '-20px 0' }}
            loop={true}
          />
          <Typography
            className="cashier-message"
            sx={{
              fontFamily: "'Bubblegum Sans', cursive",
              fontSize: '20px',
              color: '#000000', // Black text
              background: '#FFFFFF', // White background
              borderRadius: '8px',
              padding: '8px 12px',
              maxWidth: 180,
              boxShadow: `0 2px 4px ${colors.shadow}`,
            }}
          >
            {cashierMessage}
          </Typography>
        </CashierBubble>
      </HeroSection>

      {/* Popular Categories */}
      <SectionTitle>Категории</SectionTitle>
      <Grid container spacing={2} justifyContent="center">
        {shopData.map((category, index) => (
          <Grid item xs={6} sm={4} md={2} key={category.category}>
            <CategoryItem component={Link} to={category.path}>
              <CardMedia
                component="img"
                image={category.image}
                alt={category.category}
                sx={{ height: 80, objectFit: 'contain', mb: 1 }}
                loading="lazy"
              />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: colors.textPrimary }}>
                {category.category}
              </Typography>
            </CategoryItem>
          </Grid>
        ))}
      </Grid>

      {/* Popular Products */}
      <SectionTitle>Хиты продаж</SectionTitle>
      <Grid container spacing={3}>
        {featuredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard
              ref={(el) => (productRefs.current[index] = el)}
              className={`product-card product-card-${product.id}`}
            >
              <ProductImage
                component="img"
                image={product.image}
                alt={product.name}
                className="product-image"
              />
              <CardContent sx={{ textAlign: 'center', pb: 4, pt: 0 }}>
                <Typography
                  sx={{
                    fontFamily: "'Bubblegum Sans', cursive",
                    fontSize: '18px',
                    color: colors.textPrimary,
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
                <PriceTag>
                  ${product.usdPrice.toFixed(2)} / {solPrice ? (product.usdPrice / solPrice).toFixed(4) : '...'} SOL
                </PriceTag>
                <AddToCartButton onClick={() => handleAddToCart(product, index)}>
                  <AddShoppingCartIcon fontSize="small" />
                </AddToCartButton>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;