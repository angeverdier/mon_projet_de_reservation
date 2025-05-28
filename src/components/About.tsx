import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          À propos de notre système de réservation
        </Typography>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Notre Mission
          </Typography>
          <Typography paragraph>
            Faciliter la gestion et la réservation des salles de réunion pour optimiser
            l'utilisation des espaces de travail et améliorer la collaboration entre les équipes.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ my: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1497366216548-37526070297c"
                alt="Salle moderne"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Espaces Modernes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Des salles équipées avec les dernières technologies pour répondre
                  à tous vos besoins professionnels.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                alt="Réservation simple"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Réservation Simple
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Un système de réservation intuitif pour planifier vos réunions
                  en quelques clics.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                alt="Support client"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Support Réactif
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Une équipe disponible pour vous accompagner et répondre à
                  toutes vos questions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Contactez-nous
          </Typography>
          <Typography paragraph>
            Pour toute question ou assistance, n'hésitez pas à nous contacter :
          </Typography>
          <Typography>
            Téléphone : +225 07 49 90 03 79
          </Typography>
          <Typography>
            Adresse : Abidjan, Côte d'Ivoire
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About; 