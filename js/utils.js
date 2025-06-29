import { POLAND_BOUNDS, TEMPERATURE_COLORS } from './config.js';

/**
 * Seeded random number generator.
 */
class SeededRandom {
  /**
   * @param {number} seed - Initial seed value.
   */
  constructor(seed = 0) {
    this.seed = seed;
  }
  /**
   * Returns the next random number in [0, 1).
   * @returns {number}
   */
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Global generator with fixed seed
const seededRandom = new SeededRandom(0);

/**
 * Generates a random point within the bounds of Poland.
 * @returns {[number, number]} [latitude, longitude]
 */
export const getRandomPointInPoland = () => {
  const lat =
    POLAND_BOUNDS.lat.min +
    seededRandom.next() * (POLAND_BOUNDS.lat.max - POLAND_BOUNDS.lat.min);
  const lng =
    POLAND_BOUNDS.lng.min +
    seededRandom.next() * (POLAND_BOUNDS.lng.max - POLAND_BOUNDS.lng.min);
  return [lat, lng];
};

/**
 * Generates a random temperature between 0 and 100°C.
 * @returns {number}
 */
export const getRandomTemperature = () => Math.round(seededRandom.next() * 100);

/**
 * Returns a color string for a given temperature value.
 * @param {number} temp - Temperature value (0-100).
 * @returns {string} CSS rgb color string.
 */
export const getColorByTemperature = temp => {
  if (typeof temp !== 'number' || isNaN(temp) || !isFinite(temp)) {
    return 'rgba(0,0,0,0)';
  }

  if (temp <= TEMPERATURE_COLORS[0].temp) {
    return `rgb(${TEMPERATURE_COLORS[0].color.join(',')})`;
  }

  if (temp >= TEMPERATURE_COLORS.at(-1).temp) {
    return `rgb(${TEMPERATURE_COLORS.at(-1).color.join(',')})`;
  }

  for (let i = 0; i < TEMPERATURE_COLORS.length - 1; i++) {
    const current = TEMPERATURE_COLORS[i];
    const next = TEMPERATURE_COLORS[i + 1];

    if (temp >= current.temp && temp <= next.temp) {
      const ratio = (temp - current.temp) / (next.temp - current.temp);
      const interpolatedColor = current.color.map((start, index) =>
        Math.round(start + (next.color[index] - start) * ratio)
      );
      return `rgb(${interpolatedColor.join(',')})`;
    }
  }

  return 'rgba(0,0,0,0)';
};
