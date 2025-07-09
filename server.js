const express = require('express');
const https = require('https');
const path = require('path');
const app = express();

// Serve static files like CSS, JS from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Weather API route that fetches data from OpenWeather
app.get('/weather', (req, res) => {
    const city = req.query.city;  // Get the city parameter from the query string
    const apiKey = '4bbacba7fe94ad7ae83748494ee107bf'; // Your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather data for: ${city}`);

    https.get(url, (response) => {
        let data = '';

        // Concatenate chunks of data from the response
        response.on('data', (chunk) => {
            data += chunk;
        });

        // Once the response is finished, parse and send it as JSON
        response.on('end', () => {
            try {
                const weatherData = JSON.parse(data);
                console.log('Weather data received:', weatherData);

                // Send the weather data as a JSON response to the client
                res.json(weatherData);
            } catch (error) {
                console.error('Error parsing weather data:', error);
                res.status(500).json({ error: 'Error parsing weather data' });
            }
        });
    }).on('error', (error) => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
