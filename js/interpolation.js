// Funkcja do interpolacji temperatury z wygładzaniem
export const interpolateTemperature = (lat, lng, points, numNeighbors = 5) => {
  const distances = points.map(p => ({
    point: p,
    distance: Math.hypot(lat - p.lat, lng - p.lng)
  }));

  distances.sort((a, b) => a.distance - b.distance);
  const nearest = distances.slice(0, numNeighbors);

  if (nearest.at(0)?.distance < 0.1) {
    return nearest.at(0).point.temp;
  }

  const { totalWeight, weightedSum } = nearest.reduce((acc, n) => {
    const weight = 1 / (n.distance + 0.1);
    acc.totalWeight += weight;
    acc.weightedSum += n.point.temp * weight;
    return acc;
  }, { totalWeight: 0, weightedSum: 0 });

  return Math.round(weightedSum / totalWeight);
};

// Funkcja do obliczania temperatury w punkcie siatki
export const getGridPointTemperature = (i, j, basePoints, bounds, rows, cols) => {
  const latStep = (bounds.lat.max - bounds.lat.min) / (rows - 1);
  const lngStep = (bounds.lng.max - bounds.lng.min) / (cols - 1);

  const lat = bounds.lat.min + i * latStep;
  const lng = bounds.lng.min + j * lngStep;

  return interpolateTemperature(lat, lng, basePoints);
};
