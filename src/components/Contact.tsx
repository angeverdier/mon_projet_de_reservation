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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Veuillez corriger les erreurs dans le formulaire',
        severity: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message: 'Votre message a été envoyé avec succès !',
        severity: 'success',
      });

      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Une erreur est survenue lors de l\'envoi du message',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
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
            Contactez-nous
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Envoyez-nous un message
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Nom"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          label="Prénom"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Sujet"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                          <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={handleReset}
                            disabled={isSubmitting}
                            fullWidth
                          >
                            Annuler
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            disabled={isSubmitting}
                            fullWidth
                          >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Informations de contact
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Adresse"
                        secondary="Abidjan, Côte d'Ivoire"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Téléphone"
                        secondary="+225 07 49 90 03 79"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary="contact@reservationsalles.fr"
                      />
                    </ListItem>
                  </List>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Horaires d'ouverture
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Lundi - Vendredi : 9h00 - 18h00
                    </Typography>
                    <Typography variant="body1">
                      Samedi - Dimanche : Fermé
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
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
  );
};

export default Contact; 