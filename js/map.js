// ⚠️ UWAGA: NIE EDYTOWAĆ LOGIKI GENEROWANIA SIATKI 40K, WARSTW ANI ICH WIZUALIZACJI!
// Logika generowania siatki, warstw i ich wyświetlania jest poprawna i powiązana z eksportem GeoTIFF.
// Zmiana tej logiki może zepsuć spójność danych, testy i eksport GeoTIFF.

import { EUROPE_BOUNDS, GRID_CONFIG } from './config.js';
import { getRandomPointInEurope, getRandomTemperature, getColorByTemperature } from './utils.js';
import { getGridPointTemperature } from './interpolation.js';
import { createTemperatureMarker } from './markers.js';
import { generateGeoTIFF } from './geotiff.js';
import { createGeoTIFFLayer, downloadGeoTIFF } from './geotiff-layer.js';
import { createTemperatureLegend } from './legend.js';

// Główna funkcja inicjalizująca
export const initializeMap = () => {
  // Inicjalizacja mapy
  const map = L.map('map').setView([52, 15], 4);

  // Dodaj warstwę OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Dodaj funkcjonalność kliknięcia na mapę
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`Współrzędne: <b>${lat.toFixed(6)}, ${lng.toFixed(6)}</b>`)
      .openOn(map);
  });

  // Dodaj prostokąt z granicami Europy
  const europeBorder = L.rectangle([
    [EUROPE_BOUNDS.lat.min, EUROPE_BOUNDS.lng.min],
    [EUROPE_BOUNDS.lat.max, EUROPE_BOUNDS.lng.max]
  ], {
    color: '#000000',
    weight: 2,
    fillColor: 'transparent',
    fillOpacity: 0,
    opacity: 1
  }).addTo(map);

  // Tworzenie warstw
  const baseLayerGroup = L.layerGroup();
  const gridLayerGroup = L.layerGroup();

  // Generuj 100 losowych punktów z temperaturą
  const basePoints = Array.from({ length: 100 }, () => {
    const [lat, lng] = getRandomPointInEurope();
    const temp = getRandomTemperature();
    return { lat, lng, temp };
  });

  // Wyświetl oryginalne punkty jako większe markery
  basePoints.forEach(p => {
    const marker = createTemperatureMarker(p.lat, p.lng, p.temp, {
      radius: 10,
      weight: 2,
      fillOpacity: 1
    });
    baseLayerGroup.addLayer(marker);
  });

  // Generuj siatkę punktów
  const latStep = (EUROPE_BOUNDS.lat.max - EUROPE_BOUNDS.lat.min) / (GRID_CONFIG.rows - 1);
  const lngStep = (EUROPE_BOUNDS.lng.max - EUROPE_BOUNDS.lng.min) / (GRID_CONFIG.cols - 1);

  // Generuj dane siatki dla GeoTIFF
  const gridData = Array.from({ length: GRID_CONFIG.rows }, (_, i) =>
    Array.from({ length: GRID_CONFIG.cols }, (_, j) => {
      const lat = EUROPE_BOUNDS.lat.min + i * latStep;
      const lng = EUROPE_BOUNDS.lng.min + j * lngStep;
      const temp = getGridPointTemperature(i, j, basePoints, EUROPE_BOUNDS, GRID_CONFIG.rows, GRID_CONFIG.cols);

      // Dodaj marker do istniejącej warstwy siatki
      const marker = createTemperatureMarker(lat, lng, temp, {
        radius: 2,
        color: getColorByTemperature(temp),
        weight: 0,
        opacity: 0.7,
        fillOpacity: 0.7,
        showPopup: false
      });
      gridLayerGroup.addLayer(marker);

      return temp;
    })
  );

  // Dodaj warstwy do mapy
  baseLayerGroup.addTo(map);

  // Dodaj kontrolki warstw
  const overlays = {
    'Granice Europy': europeBorder,
    'Punkty bazowe (100)': baseLayerGroup,
    'Siatka interpolowana (40k)': gridLayerGroup
  };

  // Dodaj kontrolki warstw do mapy
  const layerControl = L.control.layers(null, overlays, {
    collapsed: false,
    position: 'topright'
  }).addTo(map);

  // Generuj GeoTIFF
  let geotiffBlob = null;
  let geotiffLayer = null;

  generateGeoTIFF(gridData, GRID_CONFIG.rows, GRID_CONFIG.cols, EUROPE_BOUNDS)
    .then(async (blob) => {
      if (blob) {
        geotiffBlob = blob;
        const downloadBtn = document.getElementById('downloadGeoTIFF');
        downloadBtn.disabled = false;
        downloadBtn.textContent = `📥 Pobierz GeoTIFF (${Math.round(blob.size / 1024)} KB)`;

        // Utwórz warstwę GeoTIFF na mapie
        geotiffLayer = await createGeoTIFFLayer(blob);

        if (geotiffLayer) {
          // Dodaj warstwę GeoTIFF do kontroli warstw
          overlays['Warstwa GeoTIFF'] = geotiffLayer;

          // Odśwież kontrolki warstw
          layerControl.remove();
          L.control.layers(null, overlays, {
            collapsed: false,
            position: 'topright'
          }).addTo(map);
        }
      }
    })
    .catch(error => {
      console.warn('Nie udało się utworzyć GeoTIFF:', error);
    });

  // Obsługa przycisku pobierania GeoTIFF
  document.getElementById('downloadGeoTIFF').addEventListener('click', () => {
    downloadGeoTIFF(geotiffBlob);
  });

  // Dodaj legendę temperatury
  const legend = createTemperatureLegend();
  legend.addTo(map);

  // Udostępnij dane globalnie dla konsoli
  window.basePoints = basePoints;
  window.map = map;

  console.log('Mapa temperatur w Europie została załadowana!');
  console.log('Dostępne zmienne globalne:');
  console.log('- basePoints: 100 losowych punktów z temperaturą');
  console.log('- map: obiekt mapy Leaflet');
  console.log('💡 Punkty są generowane z ustalonym seed (0) - zawsze te same przy przeładowaniu');
};
