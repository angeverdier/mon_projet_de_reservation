import React from 'react';
import {
  Paper,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

interface RoomFiltersProps {
  filters: {
    minCapacity: number;
    date: Date | null;
    equipment: string[];
  };
  onFiltersChange: (newFilters: any) => void;
  onReset: () => void;
}

const availableEquipment = ['Projecteur', 'Wifi', 'Visioconférence', 'Tableaux'];

const RoomFilters = ({ filters, onFiltersChange, onReset }: RoomFiltersProps) => {
  const handleCapacityChange = (event: Event, newValue: number | number[]) => {
    onFiltersChange({ ...filters, minCapacity: newValue as number });
  };

  const handleEquipmentChange = (equipment: string) => {
    const newEquipment = filters.equipment.includes(equipment)
      ? filters.equipment.filter(e => e !== equipment)
      : [...filters.equipment, equipment];
    onFiltersChange({ ...filters, equipment: newEquipment });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtres
        </Typography>

        <Box>
          <Typography gutterBottom>Capacité minimale: {filters.minCapacity} personnes</Typography>
          <Slider
            value={filters.minCapacity}
            onChange={handleCapacityChange}
            min={1}
            max={30}
            valueLabelDisplay="auto"
            marks={[
              { value: 1, label: '1' },
              { value: 15, label: '15' },
              { value: 30, label: '30' },
            ]}
          />
        </Box>

        <DatePicker
          label="Date souhaitée"
          value={filters.date}
          onChange={(newValue) => onFiltersChange({ ...filters, date: newValue })}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal'
            }
          }}
        />

        <FormGroup>
          <Typography gutterBottom>Équipements requis:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {availableEquipment.map((equipment) => (
              <FormControlLabel
                key={equipment}
                control={
                  <Checkbox
                    checked={filters.equipment.includes(equipment)}
                    onChange={() => handleEquipmentChange(equipment)}
                  />
                }
                label={equipment}
              />
            ))}
          </Box>
        </FormGroup>

        <Button variant="outlined" onClick={onReset}>
          Réinitialiser les filtres
        </Button>
      </Box>
    </Paper>
  );
};

export default RoomFilters; 