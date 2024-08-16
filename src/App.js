import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import WeatherForecast from './components/WeatherForecast';
import './App.css';

const App = () => {
  const [city, setCity] = useState('Nairobi'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Metric or Imperial
  const [error, setError] = useState('');
  const API_KEY = "8f1939eb8af4a222887505afb1b900b5";

  useEffect(() => {
    fetchWeatherData(city);
  }, [city, unit]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError('City not found');
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while fetching weather data');
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="app-container">
      <h1>Weatherguy</h1>

      {/* City Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Unit Toggle */}
      <div className="unit-toggle">
        <label>
          <input
            type="radio"
            name="unit"
            value="metric"
            checked={unit === 'metric'}
            onChange={handleUnitChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="radio"
            name="unit"
            value="imperial"
            checked={unit === 'imperial'}
            onChange={handleUnitChange}
          />
          Fahrenheit
        </label>
      </div>

      {/* Display Weather Data */}
      {error && <p className="error-message">{error}</p>}
      {weatherData && <Weather data={weatherData} unit={unit} />}

      {/* Display 5-Day Weather Forecast */}
      {weatherData && <WeatherForecast city={city} unit={unit} />}
    </div>
  );
};

export default App;
