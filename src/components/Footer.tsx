import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              À propos
            </Typography>
            <Typography variant="body2">
              Notre système de réservation de salles offre une solution simple et efficace
              pour gérer vos espaces de réunion et de conférence.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liens rapides
            </Typography>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ display: 'block', mb: 1 }}
            >
              Accueil
            </Link>
            <Link
              component={RouterLink}
              to="/reservations"
              color="inherit"
              sx={{ display: 'block', mb: 1 }}
            >
              Mes réservations
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              sx={{ display: 'block', mb: 1 }}
            >
              Contact
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" paragraph>
              Abidjan, Côte d'Ivoire
            </Typography>
            <Typography variant="body2" paragraph>
              Tél: +225 07 49 90 03 79
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />

        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} Room Reservation. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 