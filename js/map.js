// ⚠️ WARNING: DO NOT EDIT THE LOGIC FOR GENERATING THE 40K GRID, LAYERS, OR THEIR VISUALIZATION!
// The logic for generating the grid, layers, and their display is correct and tied to GeoTIFF export.
// Changing this logic may break data consistency, tests, and GeoTIFF export.

import { POLAND_BOUNDS, GRID_CONFIG } from './config.js';
import {
  getRandomPointInPoland,
  getRandomTemperature,
  getColorByTemperature,
} from './utils.js';
import { getGridPointTemperature } from './interpolation.js';
import { createTemperatureMarker } from './markers.js';
import { generateGeoTIFF } from './geotiff.js';
import { createGeoTIFFLayer, downloadGeoTIFF } from './geotiff-layer.js';

/**
 * Initializes the interactive temperature map of Poland.
 * Sets up the map, layers, controls, and GeoTIFF export functionality.
 */
export const initializeMap = () => {
  const map = L.map('map').setView([52, 19], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', e => {
    const { lat, lng } = e.latlng;
    L.popup()
      .setLatLng(e.latlng)
      .setContent(`Coordinates: <b>${lat.toFixed(6)}, ${lng.toFixed(6)}</b>`)
      .openOn(map);
  });

  const polandBorder = L.rectangle(
    [
      [POLAND_BOUNDS.lat.min, POLAND_BOUNDS.lng.min],
      [POLAND_BOUNDS.lat.max, POLAND_BOUNDS.lng.max],
    ],
    {
      color: '#000000',
      weight: 2,
      fillColor: 'transparent',
      fillOpacity: 0,
      opacity: 1,
    }
  ).addTo(map);

  const baseLayerGroup = L.layerGroup();
  const gridLayerGroup = L.layerGroup();

  const basePoints = Array.from({ length: 100 }, () => {
    const [lat, lng] = getRandomPointInPoland();
    const temp = getRandomTemperature();
    return { lat, lng, temp };
  });

  basePoints.forEach(point => {
    const marker = createTemperatureMarker(point.lat, point.lng, point.temp, {
      radius: 6,
      weight: 2,
      fillOpacity: 1,
    });
    baseLayerGroup.addLayer(marker);
  });

  const latStep =
    (POLAND_BOUNDS.lat.max - POLAND_BOUNDS.lat.min) / (GRID_CONFIG.rows - 1);
  const lngStep =
    (POLAND_BOUNDS.lng.max - POLAND_BOUNDS.lng.min) / (GRID_CONFIG.cols - 1);

  const gridData = Array.from({ length: GRID_CONFIG.rows }, (_, i) =>
    Array.from({ length: GRID_CONFIG.cols }, (_, j) => {
      const lat = POLAND_BOUNDS.lat.min + i * latStep;
      const lng = POLAND_BOUNDS.lng.min + j * lngStep;
      const temp = getGridPointTemperature(
        i,
        j,
        basePoints,
        POLAND_BOUNDS,
        GRID_CONFIG.rows,
        GRID_CONFIG.cols
      );

      const marker = createTemperatureMarker(lat, lng, temp, {
        radius: 2,
        color: getColorByTemperature(temp),
        weight: 0,
        opacity: 0.7,
        fillOpacity: 0.7,
        showPopup: false,
      });
      gridLayerGroup.addLayer(marker);

      return temp;
    })
  );

  baseLayerGroup.addTo(map);

  const overlays = {
    'Poland Borders': polandBorder,
    'Base Points (100)': baseLayerGroup,
    'Interpolated Grid (40k)': gridLayerGroup,
  };

  const layerControl = L.control
    .layers(null, overlays, {
      collapsed: true,
      position: 'topright',
    })
    .addTo(map);

  let geotiffBlob = null;
  let geotiffLayer = null;

  generateGeoTIFF(gridData, GRID_CONFIG.rows, GRID_CONFIG.cols, POLAND_BOUNDS)
    .then(async blob => {
      if (blob) {
        geotiffBlob = blob;
        const downloadBtn = document.getElementById('downloadGeoTIFF');
        downloadBtn.disabled = false;
        downloadBtn.textContent = `📥 Download GeoTIFF (${Math.round(blob.size / 1024)} KB)`;

        geotiffLayer = await createGeoTIFFLayer(blob);

        if (geotiffLayer) {
          overlays['GeoTIFF Layer'] = geotiffLayer;

          layerControl.remove();
          L.control
            .layers(null, overlays, {
              collapsed: true,
              position: 'topright',
            })
            .addTo(map);
        }
      }
    })
    .catch(error => {
      console.warn('Failed to create GeoTIFF:', error);
    });

  document.getElementById('downloadGeoTIFF').addEventListener('click', () => {
    downloadGeoTIFF(geotiffBlob);
  });

  window.basePoints = basePoints;
  window.map = map;
};
