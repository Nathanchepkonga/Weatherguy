import React from 'react';
import './Weather.css';

const Weather = ({ data, unit }) => {
  const { name, main, weather, wind } = data;
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-container">
      <h2 className="weather-city">{name}</h2>
      <div className="weather-info">
        <p className="weather-temp">{Math.round(main.temp)}{temperatureUnit}</p>
        <p className="weather-desc">{weather[0].description}</p>
        <p className="weather-humidity">Humidity: {main.humidity}%</p>
        <p className="weather-wind">Wind Speed: {wind.speed} {windSpeedUnit}</p>
      </div>
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="weather icon" />
      </div>
    </div>
  );
};

export default Weather;
