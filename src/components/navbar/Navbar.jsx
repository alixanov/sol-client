import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const colors = {
  primaryGradient: 'linear-gradient(135deg, #0053e3 0%, #7B61FF 100%)', // Updated to match banner
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)', // Kept for contrast
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB',
  activeBg: 'rgba(255, 255, 255, 0.25)',
  hoverBg: 'rgba(255, 255, 255, 0.15)',
  accent: '#FFD700', // Changed to gold to match banner's border
};

const NavbarContainer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 260,
    height: '100vh',
    background: colors.primaryGradient,
    borderRight: 'none',
    boxShadow: '4px 0 25px rgba(0, 0, 0, 0.15)',
    transition: theme.transitions.create(['box-shadow'], {
      duration: theme.transitions.duration.standard,
    }),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: "'Poppins', 'Comic Neue', sans-serif",
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  background: colors.primaryGradient,
  padding: '12px 0',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
  zIndex: 1300,
  display: 'flex',
  justifyContent: 'space-around',
  height: '60px',
}));

const LogoContainer = styled(Box)({
  padding: '20px',
  textAlign: 'center',
  borderBottom: `2px solid ${colors.accent}20`, // Updated to use accent color
});

const LogoText = styled(Typography)({
  color: colors.textPrimary,
  fontSize: 30,
  fontWeight: 800,
  letterSpacing: '0.5px',
  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
  fontFamily: "'Comic Neue', cursive",
});

const NavItems = styled(Box)(({ isMobile }) => ({
  display: 'flex',
  flexDirection: isMobile ? 'row' : 'column',
  gap: isMobile ? 0 : 12,
  padding: isMobile ? '0 5px' : '20px 15px',
  justifyContent: isMobile ? 'space-around' : 'flex-start',
  alignItems: 'center',
  width: '100%',
}));

const NavItem = styled(Link)(({ theme, active, isMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: isMobile ? 0 : 12,
  textDecoration: 'none',
  color: active ? colors.textPrimary : colors.textSecondary,
  padding: isMobile ? '10px 5px' : '14px 20px',
  borderRadius: 12,
  fontSize: isMobile ? 12 : 16,
  fontWeight: active ? 600 : 500,
  background: active ? colors.activeBg : 'transparent',
  transition: theme.transitions.create(['background', 'color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  flex: isMobile ? 1 : 'none',
  minWidth: isMobile ? '50px' : 'auto',
  transform: isMobile && active ? 'scale(0.95)' : 'none',
  '&:hover': {
    background: colors.hoverBg,
    color: colors.textPrimary,
    transform: isMobile ? 'scale(0.95)' : 'scale(1.05)',
    boxShadow: `0 0 10px ${colors.accent}40`,
  },
}));

const SOLPriceTicker = styled(Typography)({
  color: colors.textPrimary,
  fontSize: 14,
  textAlign: 'center',
  padding: '12px',
  background: colors.activeBg,
  borderRadius: 12,
  margin: '15px',
  fontWeight: 600,
  boxShadow: `inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)`,
  border: `1px solid ${colors.accent}30`,
});

const Navbar = ({ isMobile }) => {
  const location = useLocation();
  const [solPrice, setSolPrice] = useState(null);

  // Fetch SOL price
  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        const currentPrice = response.data.solana.usd;
        setSolPrice(currentPrice);
      } catch (error) {
        console.error('Failed to fetch SOL price:', error);
        setSolPrice(145.32);
      }
    };
    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 60000);
    return () => clearInterval(interval);
  }, []);


  
  const allLinks = [
    { to: '/', label: 'Home', icon: StoreIcon, active: location.pathname === '/' },
    { to: '/bakery', label: 'Bakery', icon: BakeryDiningIcon, active: location.pathname === '/bakery' },
    { to: '/dairy', label: 'Dairy', icon: BatteryStdIcon, active: location.pathname === '/dairy' },
    { to: '/snacks', label: 'Snacks', icon: LocalPizzaIcon, active: location.pathname === '/snacks' },
    { to: '/drinks', label: 'Drinks', icon: CoffeeIcon, active: location.pathname === '/drinks' },
    { to: '/cart', label: 'Cart', icon: ShoppingCartIcon, active: location.pathname === '/cart' },
    { to: '/target', label: 'Target', icon: CloseIcon, active: location.pathname === '/target' },
    { to: '/account', label: 'Account', icon: AccountCircleIcon, active: location.pathname === '/account' },
  ];

  // Filter links for mobile footer
  const mobileLinks = allLinks.filter(link =>
    ['Home', 'Bakery', 'Target', 'Cart', 'Account'].includes(link.label)
  );

  const renderLink = ({ to, label, icon: Icon, active }) => (
    <NavItem to={to} active={active} isMobile={isMobile} key={to}>
      <Icon sx={{ fontSize: isMobile ? 24 : 28, color: 'inherit' }} />
      {!isMobile && (
        <Typography sx={{ fontSize: 16, fontWeight: active ? 600 : 500 }}>
          {label}
        </Typography>
      )}
    </NavItem>
  );

  if (isMobile) {
    return (
      <FooterContainer>
        <NavItems isMobile={true}>
          {mobileLinks.map(renderLink)}
        </NavItems>
      </FooterContainer>
    );
  }

  return (
    <NavbarContainer variant="permanent" open={true}>
      <Box>
        <LogoContainer>
          <LogoText>SOL Basket</LogoText>
          <Typography variant="caption" sx={{ color: colors.textSecondary, fontSize: 12 }}>
            Shop with Fun!
          </Typography>
        </LogoContainer>
        <SOLPriceTicker>
          1 SOL = ${solPrice ? solPrice.toFixed(2) : '...'} USD
        </SOLPriceTicker>
        <NavItems>
          {allLinks.map(renderLink)}
        </NavItems>
      </Box>
      <Box sx={{ padding: '20px' }} />
    </NavbarContainer>
  );
};

export default Navbar;  