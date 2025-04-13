import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Breadcrumbs,
  Container,
  useMediaQuery,
  useTheme,
  Snackbar,
  SnackbarContent,
  Slide,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { gsap } from 'gsap';

// Shop data
import { shopData } from '../../components/data/ShopData';

// Colors from Home component for consistency
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

// Styled components from Home with minor adjustments
const CategoryHeader = styled(Box)(({ theme }) => ({
  background: colors.primaryGradient,
  padding: '32px 24px',
  borderRadius: 16,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `0 4px 16px ${colors.shadow}`,
  border: `2px solid ${colors.cardBorder}`,
  marginBottom: '24px',
  [theme.breakpoints.down('sm')]: {
    padding: '24px 16px',
    borderRadius: 12,
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Bubblegum Sans', cursive",
  fontSize: '32px',
  fontWeight: 400,
  color: '#FFFFFF',
  margin: '0 0 16px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    margin: '0 0 12px',
  },
}));

const CategoryDescription = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontSize: '16px',
  color: '#FFFFFF',
  opacity: 0.9,
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
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
}));

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: '24px',
  '& .MuiBreadcrumbs-ol': {
    justifyContent: 'center',
  },
  '& a': {
    color: colors.textPrimary,
    textDecoration: 'none',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '14px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& .MuiBreadcrumbs-separator': {
    margin: '0 4px',
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '16px',
    '& a, & .MuiTypography-root': {
      fontSize: '12px',
    },
  },
}));

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [solPrice, setSolPrice] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const productRefs = React.useRef([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Find category and its products
  useEffect(() => {
    const foundCategory = shopData.find(cat => cat.path === `/category/${categoryId}` || cat.category.toLowerCase() === categoryId.toLowerCase());

    if (foundCategory) {
      setCategory(foundCategory);
      setProducts(foundCategory.products);

      // Animation for category header
      gsap.fromTo(
        '.category-header',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [categoryId]);

  // Set mock SOL price for demonstrations
  useEffect(() => {
    setSolPrice(145.32);
  }, []);

  // Animation for product cards
  useEffect(() => {
    productRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { scale: 0.8, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 + index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, [products]);

  const handleAddToCart = (product, index, e) => {
    e.stopPropagation();

    // Get current cart from localStorage or create empty one
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // If product exists, increase quantity
      existingItem.quantity += 1;
    } else {
      // If product doesn't exist, add new with quantity 1
      cart.push({
        id: product.id,
        name: product.name,
        usdPrice: product.usdPrice,
        image: product.image,
        quantity: 1,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show notification
    setSnackbarMessage(`${product.name} добавлен в корзину!`);
    setOpenSnackbar(true);

    // Animate product card
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
    // Navigate to product detail (you can implement this later)
    console.log(`Navigate to product/${productId}`);
  };

  if (!category) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" sx={{ fontFamily: "'Bubblegum Sans', cursive" }}>
          Категория не найдена
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Вернитесь на <Link to="/">главную страницу</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      {/* Breadcrumbs navigation */}
      <CustomBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link to="/">Главная</Link>
        <Link to="/shop">Магазин</Link>
        <Typography color="text.primary" sx={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? '12px' : '14px' }}>
          {category.category}
        </Typography>
      </CustomBreadcrumbs>

      {/* Category header */}
      <CategoryHeader className="category-header">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CardMedia
            component="img"
            image={category.image}
            alt={category.category}
            sx={{ height: isMobile ? 60 : 80, width: 'auto', objectFit: 'contain' }}
          />
        </Box>
        <CategoryTitle>{category.category}</CategoryTitle>
        <CategoryDescription>
          {category.description || `Лучшие товары в категории ${category.category}. Выбирай из нашей эксклюзивной коллекции!`}
        </CategoryDescription>
      </CategoryHeader>

      {/* Products grid */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="start">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                ref={(el) => (productRefs.current[index] = el)}
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: 'center', py: 4, fontFamily: "'Bubblegum Sans', cursive" }}>
              В этой категории пока нет товаров
            </Typography>
          </Grid>
        )}
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
        <CustomSnackbar message={snackbarMessage} />
      </Snackbar>
    </Container>
  );
};

export default CategoryProducts;