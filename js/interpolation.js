/**
 * Interpolates temperature at a given point using nearest neighbors with smoothing.
 * @param {number} lat - Latitude of the point.
 * @param {number} lng - Longitude of the point.
 * @param {{lat: number, lng: number, temp: number}[]} points - Array of base points with temperature.
 * @param {number} [numNeighbors=5] - Number of neighbors to use for interpolation.
 * @returns {number} Interpolated temperature value.
 */
export const interpolateTemperature = (lat, lng, points, numNeighbors = 5) => {
  const distances = points.map(point => ({
    point,
    distance: Math.hypot(lat - point.lat, lng - point.lng),
  }));

  distances.sort((a, b) => a.distance - b.distance);
  const nearest = distances.slice(0, numNeighbors);

  if (nearest[0]?.distance < 0.1) {
    return nearest[0].point.temp;
  }

  const { totalWeight, weightedSum } = nearest.reduce(
    (acc, { point, distance }) => {
      const weight = 1 / (distance + 0.1);
      acc.totalWeight += weight;
      acc.weightedSum += point.temp * weight;
      return acc;
    },
    { totalWeight: 0, weightedSum: 0 }
  );

  return Math.round(weightedSum / totalWeight);
};

/**
 * Calculates the temperature at a grid point using interpolation.
 * @param {number} i - Row index.
 * @param {number} j - Column index.
 * @param {{lat: number, lng: number, temp: number}[]} basePoints - Array of base points.
 * @param {{lat: {min: number, max: number}, lng: {min: number, max: number}}} bounds - Geographic bounds.
 * @param {number} rows - Number of rows in the grid.
 * @param {number} cols - Number of columns in the grid.
 * @returns {number} Interpolated temperature value at the grid point.
 */
export const getGridPointTemperature = (
  i,
  j,
  basePoints,
  bounds,
  rows,
  cols
) => {
  const latStep = (bounds.lat.max - bounds.lat.min) / (rows - 1);
  const lngStep = (bounds.lng.max - bounds.lng.min) / (cols - 1);

  const lat = bounds.lat.min + i * latStep;
  const lng = bounds.lng.min + j * lngStep;

  return interpolateTemperature(lat, lng, basePoints);
};
