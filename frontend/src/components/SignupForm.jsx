import React, { useState } from 'react';
import CharacterInfo from './CharacterInfo';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
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
        <div className="flex flex-col gap-5 p-7 bg-white rounded-xl shadow-md">
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            className="mb-4"
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
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            disabled={loading || !email.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default SignupForm;