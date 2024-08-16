import React, { useState, useEffect } from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ city, unit }) => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  const API_KEY = "8f1939eb8af4a222887505afb1b900b5";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
        );
        const data = await response.json();

        if (data.cod !== "200") {
          setError("Error fetching forecast data");
          setForecastData([]);
        } else {
          setForecastData(data.list.filter((item, index) => index % 8 === 0)); // Get forecast for every 24 hours (API provides data in 3-hour intervals)
          setError('');
        }
      } catch (error) {
        setError("An error occurred while fetching forecast data");
        setForecastData([]);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city, unit]);

  return (
    <div className="forecast-container">
      {error && <p className="error-message">{error}</p>}
      {forecastData.length > 0 && (
        <div className="forecast-grid">
          {forecastData.map((forecast, index) => (
            <div key={index} className="forecast-item">
              <h3>{new Date(forecast.dt_txt).toLocaleDateString()}</h3>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p>{Math.round(forecast.main.temp)}{unit === 'metric' ? '°C' : '°F'}</p>
              <p>{forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
