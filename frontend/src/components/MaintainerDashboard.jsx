import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Alert,
  Snackbar,
  Modal,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { fetchUsersByRole } from '../api/api';

const MaintainerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [selectedRoles, setSelectedRoles] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [updating, setUpdating] = useState(false);

  const roles = ['Cool Kid', 'Cooler Kid', 'Coolest Kid'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersByRole('Coolest Kid');
      setUsers(data);
      const initialRoles = {};
      data.forEach(user => {
        initialRoles[user.email] = user.role || 'Cool Kid';
      });
      setSelectedRoles(initialRoles);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async () => {
    if (!pendingUpdate) return;

    const { userEmail, newRole } = pendingUpdate;

    if (verificationEmail.toLowerCase() !== userEmail.toLowerCase()) {
      setNotification({
        open: true,
        message: 'Email verification failed',
        type: 'error'
      });
      return;
    }

    setUpdating(true);

    try {
      const response = await fetch('http://localhost:3000/users/update-role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, role: newRole }),
      });

      if (!response.ok) throw new Error('Failed to update role');

      setSelectedRoles(prev => ({
        ...prev,
        [userEmail]: newRole
      }));

      setNotification({
        open: true,
        message: 'Role updated successfully',
        type: 'success'
      });
      
      fetchUsers();
    } catch (err) {
      setNotification({
        open: true,
        message: 'Failed to update role',
        type: 'error'
      });
    } finally {
      setModalOpen(false);
      setVerificationEmail('');
      setPendingUpdate(null);
      setUpdating(false);
    }
  };

  const handleRoleChange = (email, newRole) => {
    setPendingUpdate({ userEmail: email, newRole });
    setModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box className="max-w-4xl mx-auto">
      <Typography variant="h4" className="mb-6">
        User Management
      </Typography>
      
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Country</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email} className="hover:bg-gray-50">
                <TableCell>{`${user.character.firstName} ${user.character.lastName}`}</TableCell>
                <TableCell>{user.character.country}</TableCell>
                <TableCell>
                  <Select
                    value={selectedRoles[user.email] || 'Cool Kid'}
                    onChange={(e) => setSelectedRoles(prev => ({
                      ...prev,
                      [user.email]: e.target.value
                    }))}
                    size="small"
                    className="min-w-[120px]"
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleRoleChange(user.email, selectedRoles[user.email])}
                  >
                    <SaveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setVerificationEmail('');
          setPendingUpdate(null);
        }}
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-96">
          <Typography variant="h6" className="mb-4">
            Verify Email
          </Typography>
          <Typography variant="body2" className="mb-4 text-gray-600">
            Please enter the user's email address to confirm role update
          </Typography>
          <div className='mt-3'>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={verificationEmail}
            onChange={(e) => setVerificationEmail(e.target.value)}
            className="mb-4"
          />
          </div>
          <Box className="mt-4 flex justify-end gap-2">
            <Button 
              variant="outlined" 
              onClick={() => {
                setModalOpen(false);
                setVerificationEmail('');
                setPendingUpdate(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleModalSubmit}
              disabled={!verificationEmail || updating}
            >
              {updating ? <CircularProgress size={24} color="inherit" /> : 'Confirm Update'}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.type} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MaintainerDashboard; 