import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import MaintainerDashboard from '../components/MaintainerDashboard';
import { Button, Container, Typography, Box } from '@mui/material';
import { PersonAdd, Login, AdminPanelSettings } from '@mui/icons-material';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'signup':
        return <SignupForm />;
      case 'login':
        return <LoginForm />;
      case 'maintainer':
        return <MaintainerDashboard />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className="min-h-screen pt-10">
      <Box className="text-center mb-12">
        <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4">
          Cool Kids Network
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Join the coolest community and create your unique character!
        </Typography>
      </Box>

      {!activeComponent ? (
        <Box className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAdd />}
            onClick={() => setActiveComponent('signup')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Sign-up
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<Login />}
            onClick={() => setActiveComponent('login')}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Sign-in
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<AdminPanelSettings />}
            onClick={() => setActiveComponent('maintainer')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            Maintainer
          </Button>
        </Box>
      ) : (
        <Box className="mt-8">
          <Button 
            variant="outlined" 
            onClick={() => setActiveComponent(null)}
            className="mb-6"
          >
            Back to Home
          </Button>
          {renderComponent()}
        </Box>
      )}
    </Container>
  );
};

export default Home;

