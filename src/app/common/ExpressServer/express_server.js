const express = require('express');
const cors = require('cors');
const { save } = require('../services_methods.js');

const app = express();

// Konfiguracja CORS > WYMAGANA ZEBY DOPUSCIC POLACZENIE
app.use(cors({
    origin: 'http://localhost:4200', // Zmień na adres Twojej aplikacji Angular, jeśli jest inny
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Użycie middleware do parsowania JSON
app.use(express.json());

app.post('/save', (req, res) => {
    const imie = req.body.imie;
    const lastname = req.body.lastname;
    
    // Wywołanie funkcji save
    save(imie, lastname);
    
    console.log('Odebrano:', imie, lastname);
    res.status(200).send('Zapisano w bazie danych');
});

app.get('/fetchAllRecords', (req, res) => {
    // Wywołanie funkcji getAllRecords
    getAllRecords((err, LISTA) => {
        if (err) {
            console.error('Error while fetching records:', err);
            res.status(500).send('Błąd podczas pobierania rekordów');
        } else {
            console.log('All records:', LISTA);
            res.status(200).json(LISTA);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});


