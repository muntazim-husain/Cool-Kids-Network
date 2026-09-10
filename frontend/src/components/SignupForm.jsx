import React, { useState } from 'react';
import CharacterInfo from './CharacterInfo';
import { TextField, Button, Typography, CircularProgress, Box, Paper, Link } from '@mui/material';
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
        <Box className="flex justify-center items-center min-h-[65vh] p-4">
          <Paper elevation={4} className="w-full max-w-md overflow-hidden rounded-3xl">
            {/* New header */}
            <Box className="bg-gradient-to-br from-slate-900 to-zinc-800 p-9 flex flex-col items-center text-white">
              <PersonAdd sx={{ fontSize: 52, mb: 1.5, opacity: 0.95 }} />
              <Typography variant="h4" className="font-semibold tracking-[-0.5px]">
                Join the network
              </Typography>
              <Typography variant="body2" className="mt-1 opacity-75">
                Create your account in seconds
              </Typography>
            </Box>

            <Box className="p-8 bg-white">
              <TextField
                fullWidth
                label="Email address"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!error}
                helperText={error}
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '14px' } }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSignup}
                disabled={loading || !email.trim()}
                sx={{
                  py: 1.6,
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(to right, #0f172a, #334155)',
                  '&:hover': { background: 'linear-gradient(to right, #1e2937, #475569)' }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

              <Typography variant="caption" className="block text-center mt-5 text-gray-500">
                We'll email you a confirmation link
              </Typography>

              <Box className="text-center mt-4">
                <Link href="#" underline="hover" variant="body2" color="text.secondary">
                  Already have an account? Log in
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default SignupForm;