// src/UpdateProfile.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = () => {
  const [crop, setCrop] = useState('');
  const [landSize, setLandSize] = useState('');
const navigate = useNavigate()
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post(
        'http://localhost:5001/api/farmer',
        { crop, landSize },
        {
          headers: { Authorization: token },
        }
      );

      console.log('Update Response:', response.data);
      navigate('/page');
    
    } catch (error) {
      console.error('Update failed:', error.response.data.message);
    
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form>
        <div>
          <label>Crop:</label>
          <input type="text" value={crop} onChange={(e) => setCrop(e.target.value)} />
        </div>
        <div>
          <label>Land Size:</label>
          <input type="number" value={landSize} onChange={(e) => setLandSize(e.target.value)} />
        </div>
        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
