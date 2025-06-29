# Mapa Temperatur w Polsce

Interaktywna aplikacja webowa wyświetlająca mapę temperatur w Polsce z wykorzystaniem biblioteki Leaflet.

## Funkcjonalności

- **OpenStreetMap** jako podkład mapowy
- **Interaktywna mapa** z możliwością zoomowania i przesuwania
- **100 deterministycznych punktów** z temperaturą w zakresie 0°C do 100°C
- **Interpolacja temperatury** metodą najbliższych sąsiadów (5 punktów)
- **Siatka 200x200 punktów** (40 000 punktów) z interpolowanymi temperaturami
- **Kolorowe markery** z płynnymi przejściami kolorów zależne od temperatury
- **Panel kontrolny** w prawym górnym rogu mapy
- **Eksport danych** do formatu GeoTIFF

## Uruchomienie

### Development
```bash
npm install
npm run dev
```

Następnie otwórz `http://localhost:3000` w przeglądarce.

### Production Build
```bash
npm run build
npm run preview
```

Zbudowane pliki znajdziesz w katalogu `dist/`.

## Technologie

- **HTML5** - struktura aplikacji
- **CSS3** - stylowanie i responsywność
- **JavaScript (ES2022)** - logika aplikacji z modułami ES6
- **Vite** - bundler i dev server
- **Leaflet** - biblioteka mapowa
- **GeoTIFF.js** - generowanie plików GeoTIFF
- **georaster-layer-for-leaflet** - wyświetlanie warstw GeoTIFF

## Struktura projektu

```
scalar-field-demo/
├── index.html          # Główny plik aplikacji
├── style.css           # Style CSS
├── main.js             # Główny plik JavaScript
├── vite.config.js      # Konfiguracja Vite
├── package.json        # Konfiguracja npm
├── js/
│   ├── config.js       # Konfiguracja granic i siatki
│   ├── utils.js        # Funkcje pomocnicze
│   ├── interpolation.js # Funkcje interpolacji temperatury
│   ├── markers.js      # Tworzenie markerów na mapie
│   ├── geotiff.js      # Generowanie plików GeoTIFF
│   ├── geotiff-layer.js # Warstwa GeoTIFF na mapie
│   └── map.js          # Główna logika mapy
├── dist/               # Zbudowane pliki (generowane)
└── README.md           # Dokumentacja
```

## Deployment

### GitHub Pages
1. Zbuduj projekt: `npm run build`
2. Włącz GitHub Pages w ustawieniach repozytorium
3. Ustaw źródło na folder `dist/` lub branch `gh-pages`

### Inne platformy
Zbudowane pliki z katalogu `dist/` można wdrożyć na dowolną platformę hostingową (Netlify, Vercel, etc.).

## Zmienne globalne

W konsoli przeglądarki dostępne są:
- `basePoints` - 100 deterministycznych punktów z temperaturą
- `map` - obiekt mapy Leaflet

## Licencja

Projekt wykorzystuje OpenStreetMap, które jest dostępne na licencji Open Data Commons Open Database License (ODbL).
