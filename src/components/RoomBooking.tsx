import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { useReservationStore } from '../services/ReservationService';
import { format } from 'date-fns';

// Mock data pour les salles disponibles
const availableRooms = [
  {
    id: 1,
    name: 'Salle de Conférence A',
    capacity: 20,
    equipment: ['Projecteur', 'Tableau blanc', 'Visioconférence'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
  },
  {
    id: 2,
    name: 'Salle de Réunion B',
    capacity: 10,
    equipment: ['Écran TV', 'Tableau blanc'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  },
  {
    id: 3,
    name: 'Salle de Formation C',
    capacity: 15,
    equipment: ['Projecteur', 'Ordinateurs', 'Tableau interactif'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
  },
];

interface BookingForm {
  roomId: number;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}

const RoomBooking = () => {
  const { addReservation } = useReservationStore();
  const [formData, setFormData] = useState<BookingForm>({
    roomId: 0,
    date: null,
    startTime: null,
    endTime: null,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomId || !formData.date || !formData.startTime || !formData.endTime) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir tous les champs',
        severity: 'error',
      });
      return;
    }

    const selectedRoom = availableRooms.find(room => room.id === formData.roomId);
    if (!selectedRoom) return;

    const newReservation = {
      roomName: selectedRoom.name,
      date: format(formData.date, 'yyyy-MM-dd'),
      startTime: format(formData.startTime, 'HH:mm'),
      endTime: format(formData.endTime, 'HH:mm'),
      status: 'confirmed' as const,
    };

    addReservation(newReservation);
    
    setSnackbar({
      open: true,
      message: 'Réservation confirmée avec succès !',
      severity: 'success',
    });

    // Réinitialiser le formulaire
    setFormData({
      roomId: 0,
      date: null,
      startTime: null,
      endTime: null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
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
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom color="white" align="center">
                Réserver une salle
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Salle</InputLabel>
                        <Select
                          value={formData.roomId}
                          label="Salle"
                          onChange={(e) => setFormData({ ...formData, roomId: e.target.value as number })}
                        >
                          <MenuItem value={0} disabled>Sélectionnez une salle</MenuItem>
                          {availableRooms.map((room) => (
                            <MenuItem key={room.id} value={room.id}>
                              {room.name} ({room.capacity} personnes)
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Date"
                        value={formData.date}
                        onChange={(newValue) => setFormData({ ...formData, date: newValue })}
                        disablePast
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TimePicker
                        label="Heure de début"
                        value={formData.startTime}
                        onChange={(newValue) => setFormData({ ...formData, startTime: newValue })}
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TimePicker
                        label="Heure de fin"
                        value={formData.endTime}
                        onChange={(newValue) => setFormData({ ...formData, endTime: newValue })}
                        sx={{ width: '100%' }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Confirmer la réservation
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              {formData.roomId !== 0 && (
                <Card sx={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={availableRooms.find(room => room.id === formData.roomId)?.image}
                    alt="Salle sélectionnée"
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {availableRooms.find(room => room.id === formData.roomId)?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Capacité : {availableRooms.find(room => room.id === formData.roomId)?.capacity} personnes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Équipements :
                    </Typography>
                    <ul>
                      {availableRooms
                        .find(room => room.id === formData.roomId)
                        ?.equipment.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>

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
    </LocalizationProvider>
  );
};

export default RoomBooking; 