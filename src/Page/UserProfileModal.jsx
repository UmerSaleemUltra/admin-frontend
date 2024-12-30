import React from 'react';
import { 
  Modal, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { 
  Business, 
  LocationOn, 
  Person, 
  Email 
} from '@mui/icons-material';

export default function UserProfileModal({ user, open, onClose }) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          maxHeight: '90vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" mb={2}>
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: '2rem' }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
            </Box>
            <Typography variant="h5" component="div" gutterBottom align="center">
              {user.firstName} {user.lastName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <Chip 
                  icon={<Business />} 
                  label={user.businessName} 
                  variant="outlined" 
                  fullWidth
                  sx={{ justifyContent: 'flex-start', height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip 
                  icon={<LocationOn />} 
                  label={user.state} 
                  variant="outlined" 
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip 
                  icon={<Person />} 
                  label={`${user.firstName} ${user.lastName}`} 
                  variant="outlined" 
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Chip 
                  icon={<Email />} 
                  label={user.email} 
                  variant="outlined" 
                  fullWidth
                  sx={{ justifyContent: 'flex-start', height: 'auto', '& .MuiChip-label': { whiteSpace: 'normal' } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

