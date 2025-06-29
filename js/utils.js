// ⚠️ UWAGA: NIE EDYTOWAĆ LOGIKI GENEROWANIA PUNKTÓW BAZOWYCH I TEMPERATUR!
// Punkty i temperatury są deterministyczne (seed=0) i generowane poprawnie.
// Zmiana tej logiki może zepsuć spójność danych, testy i eksport GeoTIFF.

import { EUROPE_BOUNDS, TEMPERATURE_COLORS } from './config.js';

// Prosty generator liczb losowych z seed
class SeededRandom {
  constructor(seed = 12345) {
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
export const getRandomPointInEurope = () => {
  const lat = EUROPE_BOUNDS.lat.min + seededRandom.next() * (EUROPE_BOUNDS.lat.max - EUROPE_BOUNDS.lat.min);
  const lng = EUROPE_BOUNDS.lng.min + seededRandom.next() * (EUROPE_BOUNDS.lng.max - EUROPE_BOUNDS.lng.min);
  return [lat, lng];
};

// Funkcja do generowania losowej temperatury (-10 do 40°C)
export const getRandomTemperature = () => Math.round(-10 + seededRandom.next() * 50);

// Funkcja do określania koloru na podstawie temperatury
export const getColorByTemperature = (temp) => {
  // Znajdź odpowiedni przedział
  let startColor, endColor, startTemp, endTemp;

  if (temp <= TEMPERATURE_COLORS[0].temp) {
    return `rgb(${TEMPERATURE_COLORS[0].color.join(',')})`;
  }

  if (temp >= TEMPERATURE_COLORS.at(-1).temp) {
    return `rgb(${TEMPERATURE_COLORS.at(-1).color.join(',')})`;
  }

  for (let i = 0; i < TEMPERATURE_COLORS.length - 1; i++) {
    if (temp >= TEMPERATURE_COLORS[i].temp && temp <= TEMPERATURE_COLORS[i + 1].temp) {
      startColor = TEMPERATURE_COLORS[i].color;
      endColor = TEMPERATURE_COLORS[i + 1].color;
      startTemp = TEMPERATURE_COLORS[i].temp;
      endTemp = TEMPERATURE_COLORS[i + 1].temp;
      break;
    }
  }

  // Interpoluj kolor
  const ratio = (temp - startTemp) / (endTemp - startTemp);
  const interpolatedColor = startColor.map((start, index) =>
    Math.round(start + (endColor[index] - start) * ratio)
  );

  return `rgb(${interpolatedColor.join(',')})`;
};
