/**
 * Generates a GeoTIFF Blob from a temperature grid.
 * @param {number[][]} grid - 2D array of temperature values.
 * @param {number} rows - Number of rows in the grid.
 * @param {number} cols - Number of columns in the grid.
 * @param {{lat: {min: number, max: number}, lng: {min: number, max: number}}} bounds - Geographic bounds for the grid.
 * @returns {Promise<Blob|null>} A promise that resolves to a GeoTIFF Blob or null if generation fails.
 */
export const generateGeoTIFF = async (grid, rows, cols, bounds) => {
  try {
    const pixelWidth = (bounds.lng.max - bounds.lng.min) / cols;
    const pixelHeight = (bounds.lat.max - bounds.lat.min) / rows;
    const values = grid.slice().reverse().flat();
    const metadata = {
      height: rows,
      width: cols,
      ModelTiepoint: [0, 0, 0, bounds.lng.min, bounds.lat.max, 0],
      ModelPixelScale: [pixelWidth, pixelHeight, 0],
      GTModelTypeGeoKey: 2,
      GTRasterTypeGeoKey: 1,
      GeographicTypeGeoKey: 4326,
    };
    const arrayBuffer = await GeoTIFF.writeArrayBuffer(values, metadata);
    return new Blob([arrayBuffer], { type: 'image/tiff' });
  } catch (error) {
    console.error('Error generating GeoTIFF:', error);
    return null;
  }
};
