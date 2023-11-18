import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './weather.css';

const WeatherModal = ({ onClose, latitude, longitude }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const searchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fd0099d3027008191188376b69d979fa`);
        const result = await response.json();
        setWeather(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    // Call the searchWeather function when the component mounts
    searchWeather();
  }, [latitude, longitude]);

  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    if (!modalRoot) {
      throw new Error("Target container 'modal-root' is not found in the DOM.");
    }
  }, [modalRoot]);

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <button  onClick={onClose} className="close-button">
          Close
        </button>
        <div>
          <h3>Weather Information</h3>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          {/* Display other weather information as needed */}
          <p>Temperature: {weather.main?.temp}</p>
          <p>Humidity: {weather.main?.humidity}</p>
          {/* Add more weather information as needed */}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default WeatherModal;
