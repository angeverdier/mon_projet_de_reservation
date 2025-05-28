import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { format, addHours, startOfDay, eachHourOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Reservation {
  id: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  description: string;
}

interface Room {
  id: number;
  name: string;
}

interface RoomCalendarProps {
  date: Date;
  rooms: Room[];
  reservations: Reservation[];
}

const WORKING_HOURS = {
  start: 8, // 8h
  end: 20, // 20h
};

const RoomCalendar = ({ date, rooms, reservations }: RoomCalendarProps) => {
  const startTime = startOfDay(date);
  const hours = eachHourOfInterval({
    start: addHours(startTime, WORKING_HOURS.start),
    end: addHours(startTime, WORKING_HOURS.end),
  });

  const isReserved = (roomId: number, hour: Date) => {
    return reservations.some(
      (reservation) =>
        reservation.roomId === roomId &&
        hour >= reservation.startDate &&
        hour < reservation.endDate
    );
  };

  const getReservationInfo = (roomId: number, hour: Date) => {
    return reservations.find(
      (reservation) =>
        reservation.roomId === roomId &&
        hour >= reservation.startDate &&
        hour < reservation.endDate
    );
  };

  return (
    <Paper sx={{ p: 2, overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Planning du {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
      </Typography>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Heure</TableCell>
              {rooms.map((room) => (
                <TableCell key={room.id} align="center">
                  {room.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {hours.map((hour) => (
              <TableRow key={hour.toISOString()}>
                <TableCell>
                  {format(hour, 'HH:mm')}
                </TableCell>
                {rooms.map((room) => {
                  const reservation = getReservationInfo(room.id, hour);
                  const isSlotReserved = isReserved(room.id, hour);
                  return (
                    <TableCell
                      key={`${room.id}-${hour.toISOString()}`}
                      align="center"
                      sx={{
                        bgcolor: isSlotReserved ? 'primary.light' : 'inherit',
                        color: isSlotReserved ? 'primary.contrastText' : 'inherit',
                        '&:hover': {
                          bgcolor: isSlotReserved ? 'primary.main' : 'action.hover',
                        },
                      }}
                    >
                      {reservation && (
                        <Typography variant="caption">
                          {reservation.description}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RoomCalendar; 