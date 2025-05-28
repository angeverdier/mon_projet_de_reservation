import { create } from 'zustand';

export interface Reservation {
  id: number;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  cancelReservation: (id: number) => void;
  getReservations: () => Reservation[];
}

type SetState = (fn: (state: ReservationStore) => Partial<ReservationStore>) => void;
type GetState = () => ReservationStore;

// Créer un store pour gérer l'état des réservations
export const useReservationStore = create<ReservationStore>((set: SetState, get: GetState) => ({
  reservations: [],
  
  addReservation: (newReservation: Omit<Reservation, 'id'>) => set((state) => ({
    reservations: [...state.reservations, {
      ...newReservation,
      id: state.reservations.length + 1,
    }],
  })),
  
  cancelReservation: (id: number) => set((state) => ({
    reservations: state.reservations.filter((reservation: Reservation) => reservation.id !== id),
  })),
  
  getReservations: () => get().reservations,
}));

// Fonction utilitaire pour formater la date
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}; 