import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CloseIcon from '@mui/icons-material/Close';
import { useReservationStore, formatDate, Reservation } from '../services/ReservationService';

// Mock data pour les réservations
const mockReservations = [
  {
    id: 1,
    roomName: 'Salle de Conférence A',
    date: '2024-03-25',
    startTime: '09:00',
    endTime: '11:00',
    status: 'confirmed',
  },
  {
    id: 2,
    roomName: 'Salle de Réunion B',
    date: '2024-03-26',
    startTime: '14:00',
    endTime: '16:00',
    status: 'confirmed',
  },
  {
    id: 3,
    roomName: 'Salle de Formation C',
    date: '2024-03-27',
    startTime: '10:00',
    endTime: '12:00',
    status: 'confirmed',
  },
];

const MyReservations = () => {
  const { reservations, cancelReservation } = useReservationStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setOpenDialog(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      cancelReservation(selectedReservation.id);
      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: 'La réservation a été annulée avec succès',
        severity: 'success',
      });
    }
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
          <Typography variant="h4" gutterBottom color="primary" align="center">
            Mes Réservations
          </Typography>

          {reservations.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Vous n'avez aucune réservation en cours
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {reservations.map((reservation: Reservation) => (
                <Grid item xs={12} key={reservation.id}>
                  <Card 
                    sx={{ 
                      position: 'relative',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MeetingRoomIcon color="primary" />
                            <Typography variant="h6">
                              {reservation.roomName}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventIcon color="primary" />
                            <Typography>
                              {formatDate(reservation.date)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTimeIcon color="primary" />
                            <Typography>
                              {reservation.startTime} - {reservation.endTime}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleCancelClick(reservation)}
                              className="button-hover"
                            >
                              Annuler
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>

      {/* Dialog de confirmation d'annulation */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirmer l'annulation
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedReservation && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                Êtes-vous sûr de vouloir annuler votre réservation pour :
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Salle :</strong> {selectedReservation.roomName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Date :</strong> {formatDate(selectedReservation.date)}
                </Typography>
                <Typography variant="body1">
                  <strong>Horaire :</strong> {selectedReservation.startTime} - {selectedReservation.endTime}
                </Typography>
              </Box>
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                Cette action est irréversible.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Retour
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmCancel}
          >
            Confirmer l'annulation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyReservations; 