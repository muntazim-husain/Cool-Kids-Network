import React, { useEffect, useState } from 'react';
import { getCharacter, fetchUsersByRole } from '../api/api';
import Loader from './common/Loader';
import { Card, CardContent, Typography, Avatar, Box, CardHeader, Divider } from '@mui/material';

const CharacterInfo = ({ userData }) => {
  const [character, setCharacter] = useState(null);
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch user's character
        const characterData = await getCharacter(userData?.id);
        setCharacter(characterData);

        // If user is Cooler Kid or Coolest Kid, fetch all characters
        if (userData?.role === 'Cooler Kid' || userData?.role === 'Coolest Kid') {
          const allData = await fetchUsersByRole(userData?.role);
          setAllCharacters(allData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userData?.id) {
      fetchData();
    }
  }, [userData]);

  if (loading) return <Loader />;
  if (!character) return null;

  return (
    <div>
      <Card className="max-w-md mx-auto mt-4 shadow-lg">
        <CardHeader
          title={
            <Typography variant="h4" className="text-center text-gray-800 font-bold mb-4">
              Your Character
            </Typography>
          }
          className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6"
        />
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar 
              sx={{ width: 60, height: 60 }}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${character.firstName}`}
            />
            <Box>
              <Typography variant="h5">
                {character.firstName} {character.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userData.role}
              </Typography>
            </Box>
          </Box>
          <Divider className="my-3" />
          <Typography variant="body1" color="text.secondary">
            Country: {character.country}
          </Typography>
          {userData.role === 'Coolest Kid' && (
            <Typography variant="body1" color="text.secondary" className="mt-2">
              Email: {userData.email}
            </Typography>
          )}
        </CardContent>
      </Card>

      {(userData.role === 'Cooler Kid' || userData.role === 'Coolest Kid') && (
        <Card className="max-w-md mx-auto mt-4 shadow-lg">
          <CardHeader
            title={
              <Typography variant="h4" className="text-center text-gray-800 font-bold mb-4">
                All Characters
              </Typography>
            }
            className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6"
          />
          {allCharacters.map((char, index) => (
            <CardContent key={char.id} className={index !== 0 ? 'border-t' : ''}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${char.character.firstName}`}
                />
                <Box>
                  <Typography variant="h6">
                    {char.character.firstName} {char.character.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {char.character.country}
                  </Typography>
                </Box>
              </Box>
              {userData.role === 'Coolest Kid' && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Email: {char.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {char.role}
                  </Typography>
                </>
              )}
            </CardContent>
          ))}
        </Card>
      )}
    </div>
  );
};

export default CharacterInfo;
