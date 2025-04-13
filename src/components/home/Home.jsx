import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useMediaQuery,
  useTheme,
  Snackbar,
  SnackbarContent,
  Slide,
} from '@mui/material';
import { gsap } from 'gsap';
import axios from 'axios';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Cashier animation
import cashierAnimation from '../../assets/animation.json';

// Shop data
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

const HeroSection = styled(Box)(({ theme }) => ({
  background: colors.primaryGradient,
  padding: '64px 32px',
  borderRadius: 24,
  textAlign: 'center',
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
  [theme.breakpoints.down('sm')]: {
    padding: '32px 16px',
    borderRadius: 16,
    maxWidth: '100%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    padding: '48px 24px',
  },
}));

const Slogan = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '40px',
  fontWeight: 400,
  color: '#FFFFFF',
  marginBottom: '66px',
  lineHeight: 1.2,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  zIndex: 2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '26px',
    marginBottom: '40px',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '34px',
    marginBottom: '50px',
  },
}));

const CashierBubble = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down('md')]: {
    position: 'static',
    margin: '32px auto 24px',
    maxWidth: 280,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '8px',
    margin: '24px auto 16px',
  },
}));

const SOLTicker = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: '#FFFFFF',
  padding: '8px 16px',
  borderRadius: 12,
  boxShadow: `0 2px 8px ${colors.shadow}`,
  margin: '16px auto',
  border: `1px solid ${colors.cardBorder}`,
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
    borderRadius: 10,
  },
}));

const ShopButton = styled(Button)(({ theme }) => ({
  background: colors.accent,
  color: '#FFFFFF',
  fontSize: '18px',
  padding: '6px 16px',
  marginLeft: 10,
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '8px 20px',
    marginLeft: 0,
    marginTop: 10,
  },
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '17px',
    padding: '8px 22px',
  },
}));

const SwiperSlideItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover img': {
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

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

const CashierMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '20px',
  color: '#000000',
  background: '#FFFFFF',
  borderRadius: '8px',
  padding: '8px 12px',
  maxWidth: 180,
  boxShadow: `0 2px 4px ${colors.shadow}`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    padding: '6px 10px',
    maxWidth: 160,
    borderRadius: '6px',
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

const Home = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [priceTrend, setPriceTrend] = useState(null);
  const [cashierMessage, setCashierMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const heroRef = useRef(null);
  const productRefs = useRef([]);
  const snackbarRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // All products from shopData
  const allProducts = shopData.flatMap(category => category.products);

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

  // Animate Snackbar
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

    // Получаем текущую корзину из localStorage или создаём пустую
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Проверяем, есть ли продукт уже в корзине
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // Если продукт уже есть, увеличиваем количество
      existingItem.quantity += 1;
    } else {
      // Если продукта нет, добавляем новый с количеством 1
      cart.push({
        id: product.id,
        name: product.name,
        usdPrice: product.usdPrice,
        image: product.image,
        quantity: 1,
      });
    }

    // Сохраняем обновлённую корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Показываем уведомление
    setSnackbarMessage(`${product.name} добавлен в корзину!`);
    setOpenSnackbar(true);

    // Анимация карточки
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

    console.log(`Added ${product.name} to cart`, cart);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getSwiperBreakpoints = () => ({
    320: { slidesPerView: 1.2, spaceBetween: 10 },
    480: { slidesPerView: 1.8, spaceBetween: 15 },
    640: { slidesPerView: 2.5, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 30 },
  });

  const getCashierAnimationSize = () => {
    if (isMobile) return { width: 180, height: 180, margin: '-60px 0' };
    if (isTablet) return { width: 240, height: 240, margin: '-80px 0' };
    return { width: 300, height: 300, margin: '-100px 0' };
  };

  return (
    <Box sx={{
      maxWidth: '100%',
      mx: 'auto',
      px: { xs: 1.5, sm: 2, md: 3 },
      py: { xs: 2, sm: 3, md: 4 },
      marginBottom: { xs: '60px', sm: '40px', md: 0 }
    }}>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Slogan className="slogan">CartoonCart — твой SOL-вкусный мир!</Slogan>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 }
        }}>
          <SOLTicker>
            <Typography sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '14px', sm: '16px' },
              color: '#000000',
              display: 'flex',
              alignItems: 'center'
            }}>
              1 SOL = ${solPrice ? solPrice.toFixed(2) : '...'}
              {priceTrend === 'up' ? (
                <TrendingUpIcon sx={{ color: colors.accent, fontSize: { xs: '16px', sm: '18px' }, ml: 1 }} />
              ) : (
                <TrendingDownIcon sx={{ color: '#FF5252', fontSize: { xs: '16px', sm: '18px' }, ml: 1 }} />
              )}
            </Typography>
          </SOLTicker>

          <ShopButton component={Link} to="/account" className="shop-button">
            В магазин!
          </ShopButton>
        </Box>

        <CashierBubble>
          <Lottie
            animationData={cashierAnimation}
            style={getCashierAnimationSize()}
            loop={true}
          />
          <CashierMessage className="cashier-message">
            {cashierMessage}
          </CashierMessage>
        </CashierBubble>
      </HeroSection>

      {/* Popular Categories */}
      <SectionTitle>Категории</SectionTitle>
      <Swiper
        modules={[Pagination, EffectCoverflow, Autoplay]}
        slidesPerView={3}
        spaceBetween={2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 2 },
          640: { slidesPerView: 3, spaceBetween: 3 },
          1024: { slidesPerView: 5, spaceBetween: 4 },
        }}
        className="mySwiper"
        style={{ paddingBottom: '40px' }}
      >
        {shopData.map((category) => (
          <SwiperSlide key={category.category}>
            {/* Modified to navigate to the CategoryProducts component */}
            <Link to={`/category/${category.category.toLowerCase()}`} style={{ textDecoration: 'none' }}>
              <SwiperSlideItem>
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
              </SwiperSlideItem>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Popular Products */}
      <SectionTitle>Хиты продаж</SectionTitle>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {allProducts.map((product, index) => (
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
                px: { xs: 1, sm: 2 }
              }}>
                <Typography
                  sx={{
                    fontFamily: "'Bubblegum Sans', cursive",
                    fontSize: { xs: '16px', sm: '17px', md: '18px' },
                    color: colors.textPrimary,
                    mb: { xs: 0.5, sm: 1 },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
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
        ))}
      </Grid>

      {/* Snackbar Notification */}
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

export default Home;