import { getColorByTemperature } from './utils.js';

/**
 * Creates a Leaflet circle marker representing a temperature value.
 * @param {number} lat - Latitude of the marker.
 * @param {number} lng - Longitude of the marker.
 * @param {number} temp - Temperature value.
 * @param {object} [options={}] - Additional marker options.
 * @returns {L.CircleMarker} Leaflet circle marker.
 */
export const createTemperatureMarker = (lat, lng, temp, options = {}) => {
  const defaultOptions = {
    radius: 8,
    fillColor: getColorByTemperature(temp),
    color: '#111',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const markerOptions = { ...defaultOptions, ...options };
  const marker = L.circleMarker([lat, lng], markerOptions);

  if (options.showPopup !== false) {
    marker.bindPopup(
      `Temperature: <b>${temp}°C</b><br>Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`
    );
  }

  return marker;
};
