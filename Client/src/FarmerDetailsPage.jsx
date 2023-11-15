import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const FarmerDetailsPage = () => {
  const [crop, setCrop] = useState('');
  const [landSize, setLandSize] = useState('');

  const fetchFarmerDetail = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setCrop(userData.crop || '');
      setLandSize(userData.landSize || '');
      console.log(token)
    } catch (error) {
      console.error('Error fetching farmer detail:', error.response.data.message);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

    if (!token) {
      console.error('Token not found');
      return;
    }

    fetchFarmerDetail(token);
  }, [fetchFarmerDetail]);

  return (
    <div>
      <h1>Farmer Details Page</h1>
      <p>Crop: {crop}</p>
      <p>Land Size: {landSize}</p>
    </div>
  );
};

export default FarmerDetailsPage;
