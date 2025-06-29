import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serwuj pliki statyczne z katalogu głównego
app.use(express.static(__dirname));

// Główna strona
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// Endpoint do sprawdzenia statusu
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Mapa temperatur w Europie działa poprawnie',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na http://localhost:${PORT}`);
}); 