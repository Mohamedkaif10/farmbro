// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [currLocation, setCurrLocation] = useState({});
 
const navigate=useNavigate()
useEffect(() => {
    getLocation();
   
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await axios.get('http://localhost:5001/api/user', {
          headers: { Authorization: token },
        });
  
        setUserName(response.data.user.name);
        
        const location = await axios.get("https://ipapi.co/json");
        await axios.put(
          'http://localhost:5001/api/user/location',
          { region: location.data.region },
          { headers: { Authorization: token } }
        );
  
        console.log('User location updated successfully');
      } catch (error) {
        console.error('Error fetching user data:', error.response.data.message);
        // Handle error, e.g., redirect to login page
      }
    };
  
    fetchUserData();
  }, []);
  
//   const handleUpdateLocation = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         'http://localhost:5001/api/user/location',
//         {  region: currLocation.region },
//         { headers: { Authorization: token } }
//       );

//       console.log('User location updated successfully');
      
//     } catch (error) {
//       console.error('Error updating user location:', error.response.data.message);
//     }
//   };
const handleupdateProfile=()=>{
          navigate("/profile")
}
console.log(currLocation.region)
  return (
    <>
    <div>
      <h2>Welcome, {userName}!</h2>
    </div>
    <button onClick={handleupdateProfile}>profile</button>
    </>
  );
};

export default UserProfile;
