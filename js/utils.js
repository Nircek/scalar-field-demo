// ⚠️ UWAGA: NIE EDYTOWAĆ LOGIKI GENEROWANIA PUNKTÓW BAZOWYCH I TEMPERATUR!
// Punkty i temperatury są deterministyczne (seed=0) i generowane poprawnie.
// Zmiana tej logiki może zepsuć spójność danych, testy i eksport GeoTIFF.

import { POLAND_BOUNDS, TEMPERATURE_COLORS } from './config.js';

// Prosty generator liczb losowych z seed
class SeededRandom {
  constructor(seed = 0) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Globalny generator z ustalonym seed
const seededRandom = new SeededRandom(0);

// Funkcja do generowania losowych punktów w Europie
export const getRandomPointInPoland = () => {
  const lat =
    POLAND_BOUNDS.lat.min +
    seededRandom.next() * (POLAND_BOUNDS.lat.max - POLAND_BOUNDS.lat.min);
  const lng =
    POLAND_BOUNDS.lng.min +
    seededRandom.next() * (POLAND_BOUNDS.lng.max - POLAND_BOUNDS.lng.min);
  return [lat, lng];
};

// Funkcja do generowania losowej temperatury (0 do 100°C)
export const getRandomTemperature = () => Math.round(seededRandom.next() * 100);

// Funkcja do określania koloru na podstawie temperatury
export const getColorByTemperature = temp => {
  if (typeof temp !== 'number' || isNaN(temp) || !isFinite(temp)) {
    return 'rgba(0,0,0,0)';
  }

  const clampedTemp = Math.max(0, Math.min(100, temp));

  if (clampedTemp <= TEMPERATURE_COLORS[0].temp) {
    return `rgb(${TEMPERATURE_COLORS[0].color.join(',')})`;
  }

  if (clampedTemp >= TEMPERATURE_COLORS.at(-1).temp) {
    return `rgb(${TEMPERATURE_COLORS.at(-1).color.join(',')})`;
  }

  for (let i = 0; i < TEMPERATURE_COLORS.length - 1; i++) {
    const current = TEMPERATURE_COLORS[i];
    const next = TEMPERATURE_COLORS[i + 1];

    if (clampedTemp >= current.temp && clampedTemp <= next.temp) {
      const ratio = (clampedTemp - current.temp) / (next.temp - current.temp);
      const interpolatedColor = current.color.map((start, index) =>
        Math.round(start + (next.color[index] - start) * ratio)
      );
      return `rgb(${interpolatedColor.join(',')})`;
    }
  }

  return 'rgba(0,0,0,0)';
};
