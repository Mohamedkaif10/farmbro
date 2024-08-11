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


    searchWeather();
  }, [latitude, longitude]);

  const modalRoot = document.getElementById('modal-root');
  
  useEffect(() => {
    if (!modalRoot) {
      throw new Error("Target container 'modal-root' is not found in the DOM.");
    }
  }, [modalRoot]);
  const renderWeatherText = (weatherMain) => {
    switch (weatherMain) {
      case 'Haze':
         return 'పొగమంచు';
      case 'rainy':
        return 'వర్షపు'
      default:
        return weatherMain;
    }
   
  };
  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };
  

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <button  onClick={onClose} className="close-button">
          Close
        </button>
        <div className='content_of_'>
          <h3>వాతావరణ సమాచారం</h3>
          <p>ఉష్ణోగ్రత: {weather.main?.temp && convertKelvinToCelsius(weather.main.temp)}°C</p>
         <p>తేమ: {weather.main?.humidity}%</p>
         <p>వాతావరణం: {weather.weather && weather.weather.length > 0 ? renderWeatherText(weather.weather[0].main) : 'N/A'}</p>

        
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default WeatherModal;
