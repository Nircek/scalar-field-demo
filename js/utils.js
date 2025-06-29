// ⚠️ UWAGA: NIE EDYTOWAĆ LOGIKI GENEROWANIA PUNKTÓW BAZOWYCH I TEMPERATUR!
// Punkty i temperatury są deterministyczne (seed=0) i generowane poprawnie.
// Zmiana tej logiki może zepsuć spójność danych, testy i eksport GeoTIFF.

import { EUROPE_BOUNDS } from './config.js';

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
  // Płynne przejścia kolorów od niebieskiego przez zielony, żółty, pomarańczowy do czerwonego
  const colors = [
    { temp: -10, color: [52, 152, 219] },   // niebieski
    { temp: 0, color: [46, 204, 113] },     // zielony
    { temp: 10, color: [241, 196, 15] },    // żółty
    { temp: 20, color: [230, 126, 34] },    // pomarańczowy
    { temp: 30, color: [231, 76, 60] },     // czerwony
    { temp: 40, color: [192, 57, 43] }      // ciemny czerwony
  ];

  // Znajdź odpowiedni przedział
  let startColor, endColor, startTemp, endTemp;

  if (temp <= colors[0].temp) {
    return `rgb(${colors[0].color.join(',')})`;
  }

  if (temp >= colors.at(-1).temp) {
    return `rgb(${colors.at(-1).color.join(',')})`;
  }

  for (let i = 0; i < colors.length - 1; i++) {
    if (temp >= colors[i].temp && temp <= colors[i + 1].temp) {
      startColor = colors[i].color;
      endColor = colors[i + 1].color;
      startTemp = colors[i].temp;
      endTemp = colors[i + 1].temp;
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
