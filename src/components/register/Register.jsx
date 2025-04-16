import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

// Updated color scheme
const colors = {
  primaryGradient: 'linear-gradient(135deg, #0053e3 0%, #7B61FF 100%)',
  secondaryGradient: 'linear-gradient(135deg, #9333EA 0%, #D8B4FE 100%)',
  textPrimary: '#0053e3',
  white: '#FFFFFF',
  error: '#EF4444',
  accent: '#9333EA',
  border: '#E2E8F0',
};

// Styled components
const FormContainer = styled(Box)({
  width: '100%',
  borderRadius: 12,
  padding: 28,
  maxWidth: 380,
  background: colors.white,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${colors.border}`,
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 6,
    color: '#333',
    fontSize: 14,
    height: 46,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.border,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.accent,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.accent,
      borderWidth: 1.5,
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
    fontSize: 14,
    '&.Mui-focused': {
      color: colors.accent,
    },
  },
  marginBottom: 14,
});

const SubmitButton = styled(Button)({
  background: colors.primaryGradient,
  color: colors.white,
  padding: '8px 0',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: colors.primaryGradient,
    boxShadow: '0 2px 8px rgba(0, 83, 227, 0.3)',
  },
  '&:disabled': {
    background: '#CBD5E1',
    color: '#64748B',
  },
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: 10,
  color: colors.accent,
});

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    // Client-side validation
    if (!formData.login || !formData.password) {
      setLoading(false);
      setError('Login and password are required');
      return;
    }

    if (isLoginMode) {
      // Login
      try {
        const response = await fetch('https://sol-server-theta.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: formData.login,
            password: formData.password,
          }),
        });

        const result = await response.json();
        setLoading(false);

        if (response.ok) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('userData', JSON.stringify(result.user));
          navigate('/account');
        } else {
          setError(result.error || 'Login failed');
        }
      } catch (err) {
        setLoading(false);
        setError('An error occurred: ' + err.message);
      }
    } else {
      // Registration
      try {
        const response = await fetch('https://sol-server-theta.vercel.app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            login: formData.login,
            password: formData.password,
          }),
        });

        const result = await response.json();
        setLoading(false);

        if (response.ok) {
          setSuccessMessage('Registered successfully! Please sign in.');
          setIsLoginMode(true);
          setFormData({ firstName: '', lastName: '', login: '', password: '' });
        } else {
          setError(result.error || 'Registration failed');
        }
      } catch (err) {
        setLoading(false);
        setError('An error occurred: ' + err.message);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box
      sx={{
        height: { xs: '100vh', md: '90vh' },
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <FormContainer>
        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          sx={{
            mb: 3,
            fontSize: 20,
            background: colors.secondaryGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {isLoginMode ? 'Sign in' : 'Create Account'}
        </Typography>

        {error && (
          <Typography
            align="center"
            color={colors.error}
            sx={{ mb: 2, fontSize: 13 }}
          >
            {error}
          </Typography>
        )}

        {successMessage && (
          <Typography
            align="center"
            color={colors.accent}
            sx={{ mb: 2, fontSize: 13 }}
          >
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <Box display="flex" alignItems="center" mb={1.5}>
                <IconWrapper>
                  <PersonIcon sx={{ fontSize: 20 }} />
                </IconWrapper>
                <StyledTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Box>
              <Box display="flex" alignItems="center" mb={1.5}>
                <IconWrapper>
                  <PersonIcon sx={{ fontSize: 20 }} />
                </IconWrapper>
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Box>
            </>
          )}

          <Box display="flex" alignItems="center" mb={1.5}>
            <IconWrapper>
              <EmailIcon sx={{ fontSize: 20 }} />
            </IconWrapper>
            <StyledTextField
              fullWidth
              label="Login"
              name="login"
              value={formData.login}
              onChange={handleChange}
            />
          </Box>

          <Box display="flex" alignItems="center" mb={2.5}>
            <IconWrapper>
              <LockIcon sx={{ fontSize: 20 }} />
            </IconWrapper>
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Box>

          <SubmitButton
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isLoginMode ? (
              'Sign in'
            ) : (
              'Sign up'
            )}
          </SubmitButton>
        </form>

        <Typography
          align="center"
          mt={2.5}
          color="#64748B"
          sx={{ fontSize: 13 }}
        >
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
          <Typography
            component="span"
            sx={{
              cursor: 'pointer',
              color: colors.accent,
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
              transition: 'color 0.2s ease',
            }}
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setSuccessMessage('');
            }}
          >
            {isLoginMode ? 'Sign up' : 'Sign in'}
          </Typography>
        </Typography>
      </FormContainer>
    </Box>
  );
};

export default Auth;