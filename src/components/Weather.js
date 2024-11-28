import React, { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState("New York"); // Default value fore state is New York
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a valid city name");
      return;
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (error) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city on mount
    fetchWeather(city);
  }, []); 

  return (
    <div className="weather-app">
      {/* Header */}
      <header className="weather-header">
        <h1>Weather App</h1>
        <p>Get the current weather details of any city.</p>
      </header>  
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        <button onClick={() => fetchWeather(city)} className="weather-button">
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="weather-error">{error}</p>}

      {/* Weather Data */}
      {weather && (
        <div className="weather-card">
          <div className="current-weather">
            <div className="left">
              <h2>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h2>
              <p>{new Date().toLocaleDateString()}</p>
              <h1>{Math.round(weather.main.temp)}°C</h1>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="right">
              <p>PREDICTABILITY: {weather.clouds.all}%</p>
              <p>HUMIDITY: {weather.main.humidity}%</p>
              <p>WIND: {weather.wind.speed} km/h</p>
              <p>PRESSURE: {weather.main.pressure} mb</p>
              <p>MAX TEMP: {Math.round(weather.main.temp_max)}°C</p>
              <p>MIN TEMP: {Math.round(weather.main.temp_min)}°C</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
