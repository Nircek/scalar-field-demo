// ⚠️ UWAGA: NIE EDYTOWAĆ TEJ FUNKCJI! ⚠️
// Generowane dane GeoTIFF są POPRAWNE i mają właściwe współrzędne geograficzne.
// Wszystkie próby "poprawiania" orientacji mogą zepsuć działanie.
// Funkcja została przetestowana i działa prawidłowo dla granic Europy.

// Funkcja do generowania GeoTIFF z siatki temperatur
export const generateGeoTIFF = async (grid, rows, cols, bounds) => {
  try {
    const pixelWidth = (bounds.lng.max - bounds.lng.min) / cols;
    const pixelHeight = (bounds.lat.max - bounds.lat.min) / rows;

    const values = grid.slice().reverse().flat();

    const metadata = {
      height: rows,
      width: cols,

      // transformacja przestrzenna
      ModelTiepoint: [0, 0, 0, bounds.lng.min, bounds.lat.max, 0],
      ModelPixelScale: [pixelWidth, pixelHeight, 0],

      // CRS: WGS84
      GTModelTypeGeoKey: 2, // Geographic
      GTRasterTypeGeoKey: 1, // Pixel is area
      GeographicTypeGeoKey: 4326, // EPSG:4326
    };

    const arrayBuffer = await GeoTIFF.writeArrayBuffer(values, metadata);
    return new Blob([arrayBuffer], { type: 'image/tiff' });
  } catch (error) {
    console.error('Error generating GeoTIFF:', error);
    return null;
  }
};
