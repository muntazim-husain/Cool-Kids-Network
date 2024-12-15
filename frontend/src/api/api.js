const BASE_URL = 'http://localhost:3000'; // Adjust based on your backend URL

export const registerUser = async (email) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
    
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

export const getCharacter = async (userId) => {
  const res = await fetch(`${BASE_URL}/characters/my-character?userId=${userId}`);
  return res.json();
};

export const loginUser = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUsersByRole = async (role) => {
  const response = await fetch(`${BASE_URL}/users/list?role=${role}`);
  return response.json();
};

export const updateUserRole = async (email, role) => {
  const response = await fetch(`${BASE_URL}/users/update-role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, role }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update role');
  }
  
  return response.json();
};