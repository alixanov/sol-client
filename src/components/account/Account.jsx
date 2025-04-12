// Account.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Account = () => (
  <Box>
    <Typography variant="h4" sx={{ fontFamily: "'Comic Neue', cursive", mb: 2 }}>
      My Account
    </Typography>
    <Typography>Manage your profile and orders.</Typography>
  </Box>
);

export default Account;