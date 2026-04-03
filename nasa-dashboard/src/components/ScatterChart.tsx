import { ScatterChart } from '@mui/x-charts/ScatterChart';
import type { FlattenedAsteroidDangerScore } from '../pages/MainPage'; // Usunąłem FlattenedAsteroid, bo nie jest tu potrzebny
import { Box, Typography } from '@mui/material';

interface ScatterProps {
  asteroids: FlattenedAsteroidDangerScore[];
}

export function AsteroidScatterChart({ asteroids }: ScatterProps) {
  // 1. Filtrujemy i mapujemy dane dla obiektów bezpiecznych
  const safeData = asteroids
    .filter((a) => !a.is_potentially_hazardous_asteroid)
    .map((a) => ({
      id: a.name,
      x: Number(a.distance_lunar),
      y: Number(a.velocity_km_per_sec),
    }));

  // 2. Filtrujemy i mapujemy dane dla obiektów niebezpiecznych
  const hazardousData = asteroids
    .filter((a) => a.is_potentially_hazardous_asteroid)
    .map((a) => ({
      id: a.name,
      x: Number(a.distance_lunar),
      y: Number(a.velocity_km_per_sec),
    }));

  // 3. Budujemy tablicę serii DYNAMICZNIE
  // Używam 'any', aby uniknąć konfliktów typów wewnątrz samej biblioteki MUI
  const chartSeries: any[] = [];

  // Dodajemy serię z bezpiecznymi TYLKO wtedy, gdy mamy dla niej punkty
  if (safeData.length > 0) {
    chartSeries.push({
      type: 'scatter',
      label: 'Bezpieczne',
      data: safeData,
      color: 'green',
    });
  }

  // Dodajemy serię z zagrożeniami TYLKO wtedy, gdy mamy dla niej punkty
  if (hazardousData.length > 0) {
    chartSeries.push({
      type: 'scatter',
      label: 'Zagrożenie',
      data: hazardousData,
      color: 'red',
    });
  }

  // 4. Zabezpieczenie ostateczne: Jeśli obie tablice po przefiltrowaniu są puste, nie renderuj wykresu
  if (chartSeries.length === 0) {
    return <div style={{ padding: '2rem' }}>Brak punktów do wyświetlenia na wykresie.</div>;
  }

  return (
    <Box sx={{backgroundColor: 'lightgray', borderRadius: '5px'}} >
      <Typography margin={2}>Hazard Map with Velocity and Lunar Distance</Typography>
      <ScatterChart 
      height={300}
        series={chartSeries} 
        xAxis={[{ id: 'distance', label: 'Odległość (Lunar Distance)' }]}
        yAxis={[{ id: 'velocity', label: 'Prędkość (km/s)' }]}
      />
    </Box>
  );
}