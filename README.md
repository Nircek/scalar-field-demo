# Mapa Temperatur w Europie

Interaktywna aplikacja webowa wyświetlająca mapę temperatur w Europie z wykorzystaniem biblioteki Leaflet.

## Funkcjonalności

### 🗺️ Mapa
- **OpenStreetMap** jako podkład mapowy
- **Interaktywna mapa** z możliwością zoomowania i przesuwania
- **Czarny prostokąt** oznaczający granice Europy (35°N-70°N, 10°W-40°E)

### 🌡️ Dane temperaturowe
- **100 deterministycznych punktów** z temperaturą w zakresie -10°C do 40°C (zawsze te same przy każdym uruchomieniu, seed=0)
- **Interpolacja temperatury** metodą najbliższych sąsiadów (5 punktów)
- **Siatka 200x200 punktów** (40 000 punktów) z interpolowanymi temperaturami

### 🎨 Wizualizacja
- **Kolorowe markery** z płynnymi przejściami kolorów zależne od temperatury:
  - Niebieski: < 0°C
  - Zielony: 0-10°C
  - Żółty: 10-20°C
  - Pomarańczowy: 20-30°C
  - Czerwony: > 30°C

### 🎛️ Kontrolki warstw
Panel kontrolny w prawym górnym rogu mapy umożliwia włączanie/wyłączanie:
- **Granice Europy** - czarny prostokąt z granicami
- **Punkty bazowe (100)** - oryginalne punkty z temperaturą (większe markery)
- **Siatka interpolowana (40k)** - siatka 40 000 punktów z interpolowanymi temperaturami (domyślnie wyłączona)

### 📍 Interaktywność
- **Kliknięcie na mapę** wyświetla współrzędne geograficzne w popupie
- **Kliknięcie na marker** wyświetla temperaturę i współrzędne punktu
- **Responsywny design** dostosowujący się do rozmiaru ekranu

### 📥 Eksport danych
- **Przycisk "Pobierz GeoTIFF"** - generuje i pobiera plik GeoTIFF z siatką temperatur
- Plik zawiera dane w formacie GeoTIFF z poprawną transformacją współrzędnych geograficznych (EPSG:4326, WGS84)
- Nazwa pliku: `temperatura_europa.tiff`
- **Uwaga:** Plik GeoTIFF nie jest wyświetlany jako warstwa na mapie, a jedynie generowany do pobrania.

## ⚠️ Ważne dla rozwoju
- Funkcja generująca plik GeoTIFF (`generateGeoTIFF` w `js/geotiff.js`) **nie powinna być edytowana** – generuje poprawne dane i orientację. Każda próba "poprawiania" może zepsuć działanie!
- Punkty i temperatury są deterministyczne (seed=0) – zawsze te same przy każdym uruchomieniu.
- Kod jest zgodny z ESLint i Prettier – zachowana czystość i spójność stylu.

## Uruchomienie

### 🚀 Szybki start (zalecane)
```bash
# Zainstaluj zależności
npm install

# Uruchom serwer development
npm start
```

Następnie otwórz `http://localhost:3000` w przeglądarce.

### 🔧 Alternatywne sposoby uruchomienia

#### 1. Otwarcie w przeglądarce
Po prostu otwórz plik `index.html` w przeglądarce internetowej.

#### 2. Inne serwery lokalne
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (jeśli masz zainstalowany)
npx serve .

# PHP
php -S localhost:8000
```

## Development

### 📦 Zależności
```bash
# Instalacja
npm install

# Lub z yarn
yarn install
```

### 🛠️ Skrypty npm
```bash
# Uruchom serwer development
npm start
npm run dev

# Sprawdź kod (ESLint)
npm run lint
npm run lint:fix

# Formatuj kod (Prettier)
npm run format
npm run format:check

# Sprawdź wszystko
npm run check
```

### 🔍 ESLint
Konfiguracja ESLint znajduje się w `.eslintrc.json` i obejmuje:
- ES2022 features
- Moduły ES6
- Reguły dla czystego kodu
- Wsparcie dla Leaflet i GeoTIFF globals

### 💅 Prettier
Konfiguracja Prettier w `.prettierrc` zapewnia spójne formatowanie kodu.

## Technologie

- **HTML5** - struktura aplikacji
- **CSS3** - stylowanie i responsywność
- **JavaScript (ES2022)** - logika aplikacji z modułami ES6
- **Node.js** - serwer development i narzędzia
- **Express** - serwer HTTP
- **ESLint** - linting kodu
- **Prettier** - formatowanie kodu
- **Leaflet** - biblioteka mapowa (ładowana z CDN)
- **GeoTIFF.js** - generowanie plików GeoTIFF (ładowana z CDN)

## Struktura projektu

```
scaler-field-demo/
├── index.html          # Główny plik aplikacji
├── style.css           # Style CSS
├── main.js             # Główny plik JavaScript (moduł ES6)
├── server.js           # Serwer Express dla developmentu
├── package.json        # Konfiguracja npm i zależności
├── .eslintrc.json      # Konfiguracja ESLint
├── .prettierrc         # Konfiguracja Prettier
├── js/
│   ├── config.js       # Konfiguracja granic i siatki
│   ├── utils.js        # Funkcje pomocnicze (kolory, losowe dane)
│   ├── interpolation.js # Funkcje interpolacji temperatury
│   ├── markers.js      # Tworzenie markerów na mapie
│   ├── geotiff.js      # Generowanie plików GeoTIFF
│   └── map.js          # Główna logika mapy i warstw
├── README.md           # Dokumentacja
└── .gitignore          # Pliki ignorowane przez Git
```

## Zmienne globalne

W konsoli przeglądarki dostępne są:
- `basePoints` - 100 deterministycznych punktów z temperaturą
- `map` - obiekt mapy Leaflet

## Licencja

Projekt wykorzystuje OpenStreetMap, które jest dostępne na licencji Open Data Commons Open Database License (ODbL).
