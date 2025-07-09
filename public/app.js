async function fetchWeather() {
    const city = document.getElementById('city').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const errorMessage = document.getElementById('errorMessage');

    if (city) {
        try {
            errorMessage.classList.add('hidden');
            weatherInfo.classList.add('hidden');

            const response = await fetch(`/weather?city=${city}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error fetching weather data');
            }

            const data = await response.json();
            document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${data.main.temp}`;
            document.getElementById('description').textContent = `${data.weather[0].description}`;
            document.getElementById('humidity').textContent = `${data.main.humidity}`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed}`;

            weatherInfo.classList.remove('hidden');
        } catch (error) {
            errorMessage.textContent = 'City not found or error fetching data.';
            errorMessage.classList.remove('hidden');
            weatherInfo.classList.add('hidden');
        }
    } else {
        errorMessage.textContent = 'Please enter a city name';
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
}