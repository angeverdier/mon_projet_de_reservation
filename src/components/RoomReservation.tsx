import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardMedia,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import EventIcon from '@mui/icons-material/Event';

// Mock data - À remplacer par des données réelles
const rooms = [
  {
    id: 1,
    name: 'Salle de Conférence A',
    capacity: 20,
    equipment: ['Projecteur', 'Wifi', 'Visioconférence'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    description: 'Grande salle moderne équipée pour les conférences et présentations importantes',
  },
  {
    id: 2,
    name: 'Salle de Réunion B',
    capacity: 8,
    equipment: ['Écran', 'Wifi'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    description: 'Salle intimiste idéale pour les réunions d\'équipe',
  },
  {
    id: 3,
    name: 'Salle de Formation C',
    capacity: 15,
    equipment: ['Projecteur', 'Wifi', 'Tableaux'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    description: 'Salle spacieuse adaptée aux sessions de formation',
  },
];

const steps = ['Informations', 'Horaires', 'Confirmation'];

const RoomReservation = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [error, setError] = useState('');

  const room = rooms.find(r => r.id === Number(roomId));

  useEffect(() => {
    if (!room) {
      navigate('/');
    }
  }, [room, navigate]);

  const validateStep = () => {
    setError('');
    
    switch (activeStep) {
      case 0:
        if (!description || !participants) {
          setError('Veuillez remplir tous les champs');
          return false;
        }
        if (Number(participants) > (room?.capacity || 0)) {
          setError(`Cette salle ne peut accueillir que ${room?.capacity} personnes`);
          return false;
        }
        break;
      case 1:
        if (!startDate || !endDate) {
          setError('Veuillez sélectionner les dates de début et de fin');
          return false;
        }
        if (startDate >= endDate) {
          setError('La date de fin doit être après la date de début');
          return false;
        }
        const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
        if (duration > 4) {
          setError('La durée maximum de réservation est de 4 heures');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Ici, vous pouvez ajouter la logique pour sauvegarder la réservation
    console.log('Réservation créée:', {
      roomId,
      startDate,
      endDate,
      description,
      participants: Number(participants),
    });

    navigate('/my-reservations');
  };

  if (!room) return null;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre de participants"
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              inputProps={{ min: 1, max: room.capacity }}
              helperText={`Capacité maximum: ${room.capacity} personnes`}
              required
            />
            <TextField
              label="Description de la réunion"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <DateTimePicker
              label="Date et heure de début"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: { required: true }
              }}
            />
            <DateTimePicker
              label="Date et heure de fin"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: { required: true }
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Date et horaires"
                  secondary={startDate && endDate ? `${format(startDate, 'PPP à p', { locale: fr })} - ${format(endDate, 'p', { locale: fr })}` : ''}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Participants"
                  secondary={`${participants} personne${Number(participants) > 1 ? 's' : ''}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Description"
                  secondary={description}
                />
              </ListItem>
            </List>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={room.image}
          alt={room.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {room.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {room.description}
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          {renderStepContent()}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack}>
                Retour
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Confirmer la réservation' : 'Suivant'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RoomReservation; 