// SchemeDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SchemeDetails = () => {
  const { schemeId } = useParams();
  const [schemeDetails, setSchemeDetails] = useState({});

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5001/api/schemes/${schemeId}`, {
          headers: { Authorization: token },
        });
        setSchemeDetails(response.data);
        console.log(response.data.scheme.name)
      } catch (error) {
        console.error('Error fetching scheme details:', error.response?.data?.message || error.message);
      }
    };

    fetchSchemeDetails();
  }, [schemeId]);

  return (
    <div>
      <h2>Scheme Details</h2>
      <p>Scheme Name: {schemeDetails.scheme.name}</p>
      {/* Display other scheme details as needed */}
    </div>
  );
};

export default SchemeDetails;
