import React, { useState } from 'react';
import CharacterInfo from './CharacterInfo';
import { TextField, Button, Typography, CircularProgress, Box, Paper } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { registerUser } from '../api/api';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSignup = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await registerUser(email);
      if (result) {
        setUserData(result);
      }
    } catch (err) {
      if (err.message.includes('Email already exists')) {
        setError('This email is already registered');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <>
      {userData ? (
        <CharacterInfo userData={userData} />
      ) : (
        <Box className="flex justify-center items-center min-h-[60vh] p-4">
          <Paper 
            elevation={3} 
            className="w-full max-w-md overflow-hidden rounded-2xl"
          >
            {/* Gradient Header */}
            <Box 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 flex flex-col items-center text-white"
            >
              <PersonAdd sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" className="font-semibold tracking-tight">
                Create Account
              </Typography>
              <Typography variant="body2" className="mt-1 opacity-90">
                Join us today
              </Typography>
            </Box>
            
            {/* Form Content */}
            <Box className="p-8 bg-white">
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                className="mb-6"
                value={email}
                onChange={handleEmailChange}
                error={!!error}
                helperText={error}
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSignup();
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSignup}
                disabled={loading || !email.trim()}
                sx={{ 
                  py: 1.5, 
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign Up'
                )}
              </Button>
              
              <Typography variant="caption" className="block text-center mt-4 text-gray-500">
                We'll send a confirmation to your email
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default SignupForm;