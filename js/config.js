// Konfiguracja granic Europy
export const POLAND_BOUNDS = {
  lat: { min: 49, max: 55 },
  lng: { min: 14, max: 24 },
};

// Konfiguracja siatki
export const GRID_CONFIG = {
  rows: 200,
  cols: 200,
};

// Konfiguracja kolorów temperatury
export const TEMPERATURE_COLORS = [
  { temp: 0, color: [52, 152, 219] }, // niebieski
  { temp: 20, color: [46, 204, 113] }, // zielony
  { temp: 40, color: [241, 196, 15] }, // żółty
  { temp: 60, color: [230, 126, 34] }, // pomarańczowy
  { temp: 80, color: [231, 76, 60] }, // czerwony
  { temp: 100, color: [192, 57, 43] }, // ciemny czerwony
];
