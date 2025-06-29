# Temperature Map of Poland

An interactive web application displaying a temperature map of Poland using the Leaflet library.

**Note:** This project is best experienced and maintained using [Cursor](https://www.cursor.so/), an AI-powered code editor.

## Features

- **OpenStreetMap** as the map base layer
- **Interactive map** with zoom and pan capabilities
- **100 deterministic points** with temperatures ranging from 0°C to 100°C
- **Temperature interpolation** using the nearest neighbors method (5 points)
- **200x200 grid** (40,000 points) with interpolated temperatures
- **Colorful markers** with smooth color transitions based on temperature
- **Control panel** in the top right corner of the map
- **Data export** to GeoTIFF format

## Getting Started

### Development
```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

The built files can be found in the `dist/` directory.

## Technologies

- **HTML5** - application structure
- **CSS3** - styling and responsiveness
- **JavaScript (ES2022)** - application logic with ES6 modules
- **Vite** - bundler and dev server
- **Leaflet** - mapping library
- **GeoTIFF.js** - GeoTIFF file generation
- **georaster-layer-for-leaflet** - displaying GeoTIFF layers

## Global Variables

Available in the browser console:
- `basePoints` - 100 deterministic points with temperature
- `map` - Leaflet map object

## License

This project uses OpenStreetMap, which is available under the Open Data Commons Open Database License (ODbL).
