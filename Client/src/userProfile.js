import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [currLocation, setCurrLocation] = useState({});
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

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
console.log(schemesResponse.data.schemeses)
        console.log('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error.response?.data?.message || error.message);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      <div>
        <h2>Welcome, {userName}!</h2>
      </div>
      <ul>
        {schemes && schemes.map((scheme) => (
             <li key={scheme._id}>
           <Link to={`/${scheme._id}`}>{scheme.name}</Link>
           </li>
        ))}
      </ul>
      <button onClick={handleUpdateProfile}>Profile</button>
    </>
  );
};

export default UserProfile;
