import { getColorByTemperature } from './utils.js';

// Funkcja do tworzenia warstwy GeoTIFF
export const createGeoTIFFLayer = async blob => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const georaster = await parseGeoraster(arrayBuffer);

    const geotiffLayer = new GeoRasterLayer({
      attribution: 'Temperatura w Polsce',
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
    console.warn('Nie udało się utworzyć warstwy GeoTIFF:', error);
    return null;
  }
};

// Funkcja do pobierania pliku GeoTIFF
export const downloadGeoTIFF = (blob, filename = 'temperatura_polska.tiff') => {
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
