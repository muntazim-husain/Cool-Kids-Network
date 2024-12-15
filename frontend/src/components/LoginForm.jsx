import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import CharacterInfo from './CharacterInfo';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
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

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await loginUser(email);
      if (result) {
        setUserData(result);
      }
    } catch (err) {
      setError('Invalid email or user not found');
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
            Login
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
                handleLogin();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading || !email.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Login'
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default LoginForm;
