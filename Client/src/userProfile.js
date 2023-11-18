import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WeatherModal from './weather';
import "./userProf.css"
const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [currLocation, setCurrLocation] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch user data
        const userDataResponse = await axios.get('http://localhost:5001/api/user', {
          headers: { Authorization: token },
        });
        setUserName(userDataResponse.data.user.name);

        // Fetch location
        const locationResponse = await axios.get('https://ipapi.co/json');
        setCurrLocation(locationResponse.data);
        console.log(locationResponse.data.region)
        console.log(locationResponse.data.latitude)
        console.log(locationResponse.data.longitude)

        // Update user location
        await axios.put(
          'http://localhost:5001/api/user/location',
          { region: locationResponse.data.region },

          { headers: { Authorization: token } }
        );

        // Fetch schemes
        const schemesResponse = await axios.get('http://localhost:5001/api/schemes', {
          headers: { Authorization: token },
        });
        setSchemes(schemesResponse.data.schemeses);
        setLoading(false);
console.log(schemesResponse.data.schemeses)
        console.log('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error.response?.data?.message || error.message);
        setLoading(false);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = () => {
    navigate('/profile');
  };
  const handleOpenWeatherModal = async () => {
    try {
      const weatherResponse = await axios.get('https://ipapi.co/json');
      const { latitude, longitude } = weatherResponse.data;
  
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
  
      setWeatherData({ latitude, longitude });
      setShowWeatherModal(true);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const handleCloseWeatherModal = () => {
    setShowWeatherModal(false);
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="welcome-container">
            <h2>Welcome, {userName}!</h2>
          </div>
          <div className="schemes-container">
            {schemes &&
              schemes.map((scheme) => (
                <div className="scheme-box" key={scheme._id}>
                  <Link to={`/${scheme._id}`} className="scheme-link">
                    <h3>{scheme.name}</h3>
                  </Link>
                </div>
              ))}
          </div>
          <button className="weather_button" onClick={handleOpenWeatherModal}>
            Show Weather
          </button>
          <button className="profile_button" onClick={handleUpdateProfile}>
            Profile
          </button>
          {showWeatherModal && (
            <WeatherModal
              onClose={handleCloseWeatherModal}
              latitude={weatherData.latitude}
              longitude={weatherData.longitude}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
