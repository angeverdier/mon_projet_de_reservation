import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import RoomBooking from './components/RoomBooking';
import MyReservations from './components/MyReservations';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RoomList from './components/RoomList';
import About from './components/About';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<RoomList />} />
                <Route path="/reserve/:roomId" element={<RoomBooking />} />
                <Route path="/reservations" element={<MyReservations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App; 