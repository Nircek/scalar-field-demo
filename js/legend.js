import { LEGEND_CONFIG, TEMPERATURE_COLORS } from './config.js';

// Funkcja do tworzenia legendy temperatury
export const createTemperatureLegend = () => {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');

    // Zastosuj style z konfiguracji
    Object.assign(div.style, LEGEND_CONFIG.styles);

    div.innerHTML = `<h4>${LEGEND_CONFIG.title}</h4>`;

    for (let i = 0; i < LEGEND_CONFIG.grades.length; i++) {
      const color = `rgb(${TEMPERATURE_COLORS[i].color.join(',')})`;
      const grade = LEGEND_CONFIG.grades[i];
      const nextGrade = LEGEND_CONFIG.grades[i + 1];

      if (nextGrade) {
        div.innerHTML +=
          `<i style="background:${color}; width:18px; height:18px; float:left; margin-right:8px; opacity:0.8"></i>` +
          `${grade}°C - ${nextGrade}°C<br>`;
      } else {
        div.innerHTML +=
          `<i style="background:${color}; width:18px; height:18px; float:left; margin-right:8px; opacity:0.8"></i>` +
          `${grade}°C+<br>`;
      }
    }

    return div;
  };

  return legend;
};
