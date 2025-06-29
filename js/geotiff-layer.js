import { getColorByTemperature } from './utils.js';

/**
 * Creates a GeoTIFF layer for Leaflet from a Blob.
 * @param {Blob} blob - The GeoTIFF Blob.
 * @returns {Promise<GeoRasterLayer|null>} A promise that resolves to a GeoRasterLayer or null if creation fails.
 */
export const createGeoTIFFLayer = async blob => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const georaster = await parseGeoraster(arrayBuffer);

    const geotiffLayer = new GeoRasterLayer({
      attribution: 'Temperature in Poland',
      debugLevel: 0,
      georaster,
      opacity: 0.7,
      pixelValuesToColorFn: values => {
        const temp = values[0];
        if (temp === undefined || temp === null) return 'transparent';
        return getColorByTemperature(temp);
      },
      resolution: 2048,
    });

    return geotiffLayer;
  } catch (error) {
    console.warn('Failed to create GeoTIFF layer:', error);
    return null;
  }
};

/**
 * Triggers download of a GeoTIFF Blob as a file.
 * @param {Blob} blob - The GeoTIFF Blob to download.
 * @param {string} [filename='temperature_poland.tiff'] - The filename for the downloaded file.
 */
export const downloadGeoTIFF = (blob, filename = 'temperature_poland.tiff') => {
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
