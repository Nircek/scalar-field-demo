// Konfiguracja granic Europy
export const EUROPE_BOUNDS = {
  lat: { min: 35, max: 70 },
  lng: { min: -10, max: 40 }
};

// Konfiguracja siatki
export const GRID_CONFIG = {
  rows: 200,
  cols: 200
};

// Konfiguracja kolorów temperatury
export const TEMPERATURE_COLORS = [
  { temp: -10, color: [52, 152, 219] },   // niebieski
  { temp: 0, color: [46, 204, 113] },     // zielony
  { temp: 10, color: [241, 196, 15] },    // żółty
  { temp: 20, color: [230, 126, 34] },    // pomarańczowy
  { temp: 30, color: [231, 76, 60] },     // czerwony
  { temp: 40, color: [192, 57, 43] }      // ciemny czerwony
];

// Konfiguracja legendy
export const LEGEND_CONFIG = {
  grades: [-10, 0, 10, 20, 30, 40],
  title: 'Temperatura (°C)',
  styles: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    fontSize: '12px'
  }
};
