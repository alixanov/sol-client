import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { gsap } from 'gsap';
import axios from 'axios';
import Lottie from 'lottie-react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Lottie animation
import cashierAnimation from '../../assets/animation.json';

// Shop data
import { shopData } from '../../components/data/ShopData';

const colors = {
  primaryGradient: 'linear-gradient(135deg, #00C4B4 0%, #7B61FF 100%)',
  secondaryGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF9AA2 100%)',
  textPrimary: '#FFFFFF',
  textSecondary: '#E2D9FF',
  activeBg: 'rgba(255, 255, 255, 0.2)',
  accent: '#39FF14',
  cardBg: '#F8F0FF',
  darkAccent: '#2ECC71',
};

const HeroSection = styled(Box)({
  background: colors.primaryGradient,
  padding: '60px 24px',
  borderRadius: '20px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '40px',
  opacity: 0,
  transition: 'opacity 0.8s ease-in',
  '&.visible': {
    opacity: 1,
  },
  '@media (max-width: 768px)': {
    padding: '40px 16px',
  },
});

const Slogan = styled(Typography)({
  fontFamily: "'Comic Neue', cursive",
  fontSize: '48px',
  fontWeight: 800,
  color: colors.textPrimary,
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    fontSize: '32px',
  },
});

const CashierBubble = styled(Box)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  background: colors.cardBg,
  padding: '16px 24px',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  border: `2px solid ${colors.accent}`,
  maxWidth: '300px',
  '@media (max-width: 768px)': {
    position: 'static',
    margin: '20px auto',
    width: 'fit-content',
    flexDirection: 'column',
  },
});

const SOLTicker = styled(Box)({
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: colors.activeBg,
  padding: '8px 16px',
  borderRadius: '12px',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '@media (max-width: 768px)': {
    position: 'static',
    margin: '10px auto',
    width: 'fit-content',
  },
});

const ShopButton = styled(Button)({
  background: colors.accent,
  color: '#000000',
  fontSize: '20px',
  padding: '12px 32px',
  borderRadius: '30px',
  textTransform: 'none',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  boxShadow: '0 4px 20px rgba(57, 255, 20, 0.4)',
  transition: 'all 0.4s ease',
  '&:hover': {
    background: colors.darkAccent,
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(57, 255, 20, 0.5)',
  },
  '&:active': {
    transform: 'translateY(2px)',
    boxShadow: '0 2px 8px rgba(57, 255, 20, 0.3)',
  },
});

// Simplified CategoryItem (replaces CategoryCard)
const CategoryItem = styled(Box)({
  textAlign: 'center',
  '&:hover img': {
    transform: 'scale(1.1)', // Subtle hover effect on image
    transition: 'transform 0.3s ease',
  },
});

const ProductCard = styled(Card)({
  background: colors.cardBg,
  borderRadius: '16px',
  padding: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 12px 30px rgba(123, 97, 255, 0.3)`,
    '& img': {
      transform: 'translateY(-20px) scale(1.1)',
    },
    '& .add-cart-btn': {
      transform: 'translateY(0) scale(1)',
      opacity: 1,
    },
  },
  '& img': {
    transition: 'transform 0.5s ease',
  },
});

const AddToCartButton = styled(IconButton)({
  background: colors.accent,
  color: '#000000',
  position: 'absolute',
  bottom: '0',
  left: '50%',
  transform: 'translateX(-50%) translateY(50%) scale(0.8)',
  opacity: 0,
  transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  boxShadow: '0 4px 12px rgba(57, 255, 20, 0.4)',
  '&:hover': {
    background: colors.darkAccent,
    transform: 'translateX(-50%) translateY(50%) scale(1.2)',
  },
  '&:active': {
    transform: 'translateX(-50%) translateY(50%) scale(0.9)',
  },
});

const PriceTag = styled(Box)({
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: colors.primaryGradient,
  padding: '6px 12px',
  borderRadius: '20px',
  color: colors.textPrimary,
  fontWeight: 'bold',
  fontSize: '14px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease',
  zIndex: 2,
});

const Tooltip = styled(Box)({
  position: 'absolute',
  top: '-60px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: colors.cardBg,
  padding: '10px 16px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  fontFamily: "'Comic Neue', cursive",
  fontSize: '14px',
  display: 'none',
  border: `1px solid ${colors.accent}`,
  zIndex: 10,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    border: '10px solid transparent',
    borderTopColor: colors.cardBg,
  },
});

const SectionTitle = styled(Typography)({
  fontFamily: "'Comic Neue', cursive",
  fontSize: '28px',
  fontWeight: 700,
  marginBottom: '20px',
  marginTop: '40px',
  position: 'relative',
  display: 'inline-block',
  opacity: 0,
  transform: 'translateY(20px)',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '0',
    width: '100%',
    height: '4px',
    background: colors.primaryGradient,
    borderRadius: '2px',
  },
});

const Home = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [priceTrend, setPriceTrend] = useState(null);
  const [cashierMessage, setCashierMessage] = useState('');
  const heroRef = useRef(null);
  const categoryRefs = useRef([]);
  const productRefs = useRef([]);
  const tooltipRefs = useRef([]);
  const cashierBubbleRef = useRef(null);
  const sectionRefs = useRef([]);

  // Fixed products for Popular Products
  const featuredProducts = shopData
    .find(category => category.category === 'Bakery')
    ?.products || [];

  // Cashier messages
  const messages = [
    `Сегодня SOL стоит $${solPrice ? solPrice.toFixed(2) : '...'}!`,
    'Хватай вкусный хлебушек!',
    'SOL-выгодные цены ждут!',
    'Йогурт зовёт на приключения!',
    'Напитки для супер-настроения!',
  ];

  // Fetch SOL price from CoinGecko
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
      if (cashierBubbleRef.current) {
        gsap.fromTo(
          cashierBubbleRef.current.querySelector('p'),
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 }
        );
      }
    };
    updateMessage();
    const messageInterval = setInterval(updateMessage, 5000);
    return () => clearInterval(messageInterval);
  }, [solPrice]);

  // Animate elements on mount
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('visible');
    }
    // Skip animations for categories (no transition needed)
    productRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        if (ref) {
          ref.classList.add('visible');
          gsap.fromTo(
            ref,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: index * 0.15 + 0.2, ease: 'back.out(1.7)' }
          );
        }
      }, index * 150 + 300);
    });
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.to(ref, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
                observer.unobserve(ref);
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
      }
    });
  }, []);

  // GSAP animations for tooltips and cashier bubble
  useEffect(() => {
    tooltipRefs.current.forEach((tooltip, index) => {
      if (tooltip) {
        gsap.set(tooltip, { display: 'none', opacity: 0, y: -10 });
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 8,
          delay: Math.random() * 3 + 5 + index * 2,
        });
        tl.to(tooltip, {
          display: 'block',
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        })
          .to(tooltip, {
            y: -5,
            duration: 1.5,
            ease: 'sine.inOut',
            repeat: 3,
            yoyo: true,
          })
          .to(tooltip, {
            opacity: 0,
            y: -15,
            duration: 0.5,
            display: 'none',
            delay: 1,
          });
      }
    });
    if (cashierBubbleRef.current) {
      gsap.fromTo(
        cashierBubbleRef.current,
        { scale: 0.95 },
        { scale: 1.03, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      );
      gsap.fromTo(
        cashierBubbleRef.current,
        { boxShadow: `0 4px 20px rgba(57, 255, 20, 0.2)` },
        { boxShadow: `0 4px 30px rgba(57, 255, 20, 0.6)`, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      );
    }
  }, []);

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    gsap.to(`.product-card-${product.id}`, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });
  };

  return (
    <Box sx={{ padding: { xs: '16px', md: '24px' }, marginBottom: { xs: '60px', md: 0 } }}>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Slogan>Добро пожаловать в CartoonCart — здесь вкусно, весело и в SOL!</Slogan>
        <CashierBubble ref={cashierBubbleRef}>
          <Lottie
            animationData={cashierAnimation}
            style={{ width: 120, height: 120 }}
            loop={true}
          />
          <Typography
            component="p"
            sx={{
              fontFamily: "'Comic Neue', cursive",
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            {cashierMessage}
          </Typography>
        </CashierBubble>
        <SOLTicker>
          <Typography sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: colors.textPrimary,
          }}>
            1 SOL = ${solPrice ? solPrice.toFixed(2) : '...'}${' '}
            {priceTrend === 'up' ? (
              <ArrowUpwardIcon sx={{ color: colors.accent, fontSize: '18px' }} />
            ) : (
              <ArrowDownwardIcon sx={{ color: '#FF4500', fontSize: '18px' }} />
            )}
          </Typography>
        </SOLTicker>
        <ShopButton component={Link} to="/shop">
          Начать покупки
        </ShopButton>
      </HeroSection>

      {/* Popular Categories */}
      <SectionTitle ref={(el) => (sectionRefs.current[0] = el)} variant="h5">
        Популярные категории
      </SectionTitle>
      <Grid container spacing={3}>
        {shopData.map((category, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={category.category}>
            <CategoryItem
              component={Link}
              to={category.path}
              ref={(el) => (categoryRefs.current[index] = el)}
            >
              <CardMedia
                component="img"
                image={category.image}
                alt={category.category}
                sx={{
                  height: 100,
                  objectFit: 'contain',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                }}
                loading="lazy"
              />
              <Typography sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '16px',
              }}>
                {category.category}
              </Typography>
            </CategoryItem>
          </Grid>
        ))}
      </Grid>

      {/* Popular Products */}
      <SectionTitle ref={(el) => (sectionRefs.current[1] = el)} variant="h5">
        Популярные товары
      </SectionTitle>
      <Grid container spacing={4}>
        {featuredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard
              ref={(el) => (productRefs.current[index] = el)}
              className={`product-card product-card-${product.id}`}
            >
              <PriceTag className="price-tag">
                ${product.usdPrice.toFixed(2)} /{' '}
                {solPrice ? (product.usdPrice / solPrice).toFixed(4) : '...'} SOL
              </PriceTag>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  height: 160,
                  objectFit: 'contain',
                  mb: 2,
                  filter: 'drop-shadow(0 8px 15px rgba(0,0,0,0.15))',
                }}
                loading="lazy"
              />
              <CardContent sx={{ textAlign: 'center', pb: 6 }}>
                <Typography sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  mb: 1,
                }}>
                  {product.name}
                </Typography>
                <AddToCartButton
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <AddShoppingCartIcon />
                </AddToCartButton>
                <Tooltip ref={(el) => (tooltipRefs.current[index] = el)}>
                  {product.tooltip}
                </Tooltip>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;