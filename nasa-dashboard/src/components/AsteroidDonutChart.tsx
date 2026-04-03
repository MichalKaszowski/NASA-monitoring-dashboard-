import { PieChart } from '@mui/x-charts/PieChart';
import type { FlattenedAsteroidDangerScore } from '../pages/MainPage';
import { Box, Typography } from '@mui/material';

interface DonutProps {
  asteroids: FlattenedAsteroidDangerScore[];
}

export function AsteroidDonutChart({ asteroids }: DonutProps) {
  // 1. Zliczamy obiekty niebezpieczne
  const hazardousCount = asteroids.filter(
    (a) => a.is_potentially_hazardous_asteroid
  ).length;

  // 2. Zliczamy obiekty bezpieczne (całość minus niebezpieczne)
  const safeCount = asteroids.length - hazardousCount;

  // 3. Budujemy strukturę danych dla PieChart
  const pieData = [
    { 
      id: 0, 
      value: hazardousCount, 
      label: 'Zagrożenie', 
      color: '#d32f2f' 
    },
    { 
      id: 1, 
      value: safeCount, 
      label: 'Bezpieczne', 
      color: '#4caf50' // Zielony
    },
  ];

  return (
    <Box sx={{backgroundColor: 'lightgray', borderRadius: '5px'}}>
        <Typography margin={2}>Hazardous Asteroids Proportion</Typography>
      <PieChart
       sx={{margin: '16px'}}
      height={150}

        series={[
          {
            data: pieData,
            innerRadius: 50, // To tworzy dziurę w środku (efekt Donut)
            paddingAngle: 3, // Odstęp między kawałkami
            cornerRadius: 5, // Zaokrąglone rogi kawałków
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
      />
    </Box>
  );
}