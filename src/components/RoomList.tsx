import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Tab,
  Tabs,
  Paper,
  alpha,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import WifiIcon from '@mui/icons-material/Wifi';
import RoomFilters from './RoomFilters';
import RoomCalendar from './RoomCalendar';

// Style pour l'arrière-plan
const backgroundStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  paddingTop: '2rem',
  paddingBottom: '2rem',
};

// Images des salles
const rooms = [
  {
    id: 1,
    name: 'Salle de Conférence A',
    capacity: 20,
    equipment: ['Projecteur', 'Wifi', 'Visioconférence'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80',
    description: 'Grande salle moderne équipée pour les conférences et présentations importantes',
  },
  {
    id: 2,
    name: 'Salle de Réunion B',
    capacity: 8,
    equipment: ['Écran', 'Wifi'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80',
    description: 'Salle intimiste idéale pour les réunions d\'équipe',
  },
  {
    id: 3,
    name: 'Salle de Formation C',
    capacity: 15,
    equipment: ['Projecteur', 'Wifi', 'Tableaux'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    description: 'Salle spacieuse adaptée aux sessions de formation',
  },
];

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    roomId: 1,
    startDate: new Date('2024-03-20T10:00:00'),
    endDate: new Date('2024-03-20T12:00:00'),
    description: 'Réunion d\'équipe',
  },
  {
    id: 2,
    roomId: 2,
    startDate: new Date('2024-03-20T14:00:00'),
    endDate: new Date('2024-03-20T15:30:00'),
    description: 'Point client',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`room-tabpanel-${index}`}
      aria-labelledby={`room-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RoomList = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({
    minCapacity: 1,
    date: null,
    equipment: [] as string[],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      minCapacity: 1,
      date: null,
      equipment: [],
    });
  };

  const filteredRooms = rooms.filter(room => {
    if (room.capacity < filters.minCapacity) return false;
    if (filters.equipment.length > 0) {
      if (!filters.equipment.every(eq => room.equipment.includes(eq))) return false;
    }
    return true;
  });

  const renderRoomGrid = () => (
    <Grid container spacing={4}>
      {filteredRooms.map((room) => (
        <Grid item key={room.id} xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={room.image}
              alt={room.name}
              sx={{
                objectFit: 'cover',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2" sx={{ color: 'primary.main' }}>
                {room.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {room.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 1,
                    color: 'text.primary',
                  }}
                >
                  <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} /> 
                  Capacité: {room.capacity} personnes
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  Équipements:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  {room.equipment.includes('Projecteur') && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                    }}>
                      <PresentToAllIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                      <Typography variant="body2">Projecteur</Typography>
                    </Box>
                  )}
                  {room.equipment.includes('Wifi') && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                    }}>
                      <WifiIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                      <Typography variant="body2">Wifi</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/reserve/${room.id}`)}
                sx={{
                  mt: 'auto',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  },
                }}
              >
                Réserver
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={backgroundStyle}>
      <Container>
        <Paper 
          sx={{ 
            p: 3, 
            mb: 4, 
            backgroundColor: alpha('#fff', 0.9),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 4,
            }}
          >
            Salles Disponibles
          </Typography>

          <RoomFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          <Paper 
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="room views"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Tab 
                label="Vue Grille" 
                sx={{ 
                  fontWeight: 'bold',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                }}
              />
              <Tab 
                label="Vue Calendrier"
                sx={{ 
                  fontWeight: 'bold',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                }}
              />
            </Tabs>

            <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
              <TabPanel value={tabValue} index={0}>
                {renderRoomGrid()}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <RoomCalendar
                  date={filters.date || new Date()}
                  rooms={rooms}
                  reservations={mockReservations}
                />
              </TabPanel>
            </Box>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default RoomList; 