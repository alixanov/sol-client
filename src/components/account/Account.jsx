import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Avatar, Divider, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';

// Color scheme matching Auth component
const colors = {
  primaryGradient: 'linear-gradient(135deg, #0053e3 0%, #7B61FF 100%)',
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)',
  textPrimary: '#0053e3',
  white: '#FFFFFF',
  accent: '#9333EA',
  border: '#E2E8F0',
  bg: '#F8FAFC',
};

const AccountContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 2),
  maxWidth: 1200,
  margin: '0 auto',
  minHeight: '100vh',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1),
  },
}));

const HeaderSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  marginBottom: theme.spacing(3),
  background: colors.white,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
  border: `1px solid ${colors.border}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: 8,
  },
}));

const WelcomeBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  background: colors.primaryGradient,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: '1.2rem',
  },
}));

const MenuSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  background: colors.white,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
  border: `1px solid ${colors.border}`,
  [theme.breakpoints.down('sm')]: {
    width:"340px",
    padding: theme.spacing(2),
    borderRadius: 8,
  },
}));

const MenuItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: colors.bg,
  },
  '&:focus': {
    outline: `2px solid ${colors.accent}`,
    background: colors.bg,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(5),
  height: theme.spacing(5),
  borderRadius: 8,
  marginRight: theme.spacing(2),
  background: colors.bg,
  color: colors.accent,
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1.5),
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  background: colors.white,
  border: `1px solid ${colors.border}`,
  color: '#64748B',
  padding: theme.spacing(1, 2),
  borderRadius: 6,
  fontSize: '0.875rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  textTransform: 'none',
  '&:hover': {
    background: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1),
    fontSize: '0.8rem',
  },
}));

const StartShoppingButton = styled(Button)(({ theme }) => ({
  background: colors.primaryGradient,
  color: colors.white,
  padding: theme.spacing(1.5, 3),
  borderRadius: 8,
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: colors.primaryGradient,
    boxShadow: '0 2px 8px rgba(0, 83, 227, 0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.9rem',
  },
}));

const Account = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/');
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  // Show loading state
  if (!userData) {
    return (
      <AccountContainer>
        <Typography variant="h6" sx={{ textAlign: 'center', color: colors.textPrimary }}>
          Loading account information...
        </Typography>
      </AccountContainer>
    );
  }

  // Get first initials for avatar
  const getInitials = () => {
    const firstName = userData.firstName || '';
    const lastName = userData.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  // Menu items configuration
  const menuItems = [
    { label: 'My Profile', icon: <PersonIcon />, path: '', ariaLabel: 'View your profile' },
    { label: 'My Orders', icon: <ShoppingBagIcon />, path: '', ariaLabel: 'View your orders' },
    { label: 'Shipping Addresses', icon: <LocalShippingIcon />, path: '', ariaLabel: 'Manage shipping addresses' },
    { label: 'Wishlist', icon: <FavoriteIcon />, path: '', ariaLabel: 'View your wishlist' },
  ];

  return (
    <AccountContainer>
      <HeaderSection>
        <WelcomeBox>
          <ProfileAvatar aria-label="User avatar">{getInitials()}</ProfileAvatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                fontWeight: 600,
                mb: 0.5,
                background: colors.secondaryGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Welcome, {userData.firstName} {userData.lastName}
            </Typography>
            <Typography
              color="#64748B"
              variant={isMobile ? 'body2' : 'body1'}
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              Manage your profile and orders
            </Typography>
          </Box>
          <LogoutButton onClick={handleLogout} aria-label="Sign out">
            Sign Out
          </LogoutButton>
        </WelcomeBox>
      </HeaderSection>

      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} md={4}>
          <MenuSection>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 600,
                mb: 2,
                color: colors.textPrimary,
              }}
            >
              Account Menu
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleMenuClick(item.path)}
                onKeyDown={(e) => e.key === 'Enter' && handleMenuClick(item.path)}
                tabIndex={0}
                role="button"
                aria-label={item.ariaLabel}
              >
                <IconWrapper>{item.icon}</IconWrapper>
                <Typography
                  fontWeight={500}
                  sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                >
                  {item.label}
                </Typography>
              </MenuItem>
            ))}
          </MenuSection>
        </Grid>

        <Grid item xs={12} md={8}>
          <MenuSection>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 600,
                mb: 2,
                color: colors.textPrimary,
              }}
            >
              Recent Orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ textAlign: 'center', py: isMobile ? 3 : 4 }}>
              <Typography
                color="#64748B"
                variant={isMobile ? 'body2' : 'body1'}
              >
                You don't have any orders yet.
              </Typography>
              <StartShoppingButton
                sx={{ mt: isMobile ? 1.5 : 2 }}
                onClick={() => navigate('/')}
                aria-label="Start shopping"
              >
                Start Shopping
              </StartShoppingButton>
            </Box>
          </MenuSection>
        </Grid>
      </Grid>
    </AccountContainer>
  );
};

export default Account;