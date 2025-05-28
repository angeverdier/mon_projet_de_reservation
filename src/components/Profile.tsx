import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Profile = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Marketing',
  });

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveChanges = () => {
    // Ici, vous ajouteriez la logique pour sauvegarder les modifications dans votre backend
    setOpenEditDialog(false);
    setOpenSnackbar(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 6,
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            backgroundColor: alpha('#fff', 0.9),
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '3rem',
                    }}
                  >
                    {editedProfile.firstName[0]}{editedProfile.lastName[0]}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: -8,
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                    size="small"
                  >
                    <PhotoCameraIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
                <Typography variant="h5" gutterBottom>
                  {editedProfile.firstName} {editedProfile.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {editedProfile.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary">
                  Mon Profil
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                >
                  Modifier
                </Button>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Informations Personnelles
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Nom
                          </Typography>
                          <Typography variant="body1">{editedProfile.lastName}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Prénom
                          </Typography>
                          <Typography variant="body1">{editedProfile.firstName}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1">{editedProfile.email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Département
                          </Typography>
                          <Typography variant="body1">{editedProfile.department}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Statistiques de Réservation
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="primary">12</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Réservations totales
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="primary">3</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Réservations à venir
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="primary">4</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Salles différentes
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Dialog de modification */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier mon profil</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Prénom"
                  name="firstName"
                  value={editedProfile.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="lastName"
                  value={editedProfile.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Département"
                  name="department"
                  value={editedProfile.department}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleSaveChanges}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification de succès */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Profil mis à jour avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 