// SchemeDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./schemes.css"
const SchemeDetails = () => {
  const { schemeId } = useParams();
  const [schemeDetails, setSchemeDetails] = useState({});
  

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const token = localStorage.getItem('token');

       
        const detailsResponse = await axios.get(`http://localhost:5001/api/schemes/${schemeId}/details`, {
          headers: { Authorization: token },
        });

        setSchemeDetails(detailsResponse.data.schemeDetails);
      } catch (error) {
        console.error('Error fetching scheme details:', error.response?.data?.message || error.message);
      }
    };

    fetchSchemeDetails();
  }, [schemeId]);


  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const token = localStorage.getItem('token');
  
       
        const audioResponse = await axios.get(`http://localhost:5001/api/schemes/${schemeId}/audio`, {
          headers: { Authorization: token },
          responseType: 'blob', 
        });
  
       
        const reader = new FileReader();
        reader.onloadend = () => {
          const audioBase64 = reader.result.split(',')[1];
          setSchemeDetails((prevDetails) => ({ ...prevDetails, audio: audioBase64 }));
        };
  
        reader.readAsDataURL(audioResponse.data);
      } catch (error) {
        console.error('Error fetching audio:', error.response?.data?.message || error.message);
      }
    };
  
    fetchAudio();
  }, [schemeId]);

  return (
    <div className='container'>
      <h2 className='h222'>Scheme Details</h2>
      <p>Scheme Name: {schemeDetails.name}</p>
      <p>Region: {schemeDetails.region}</p>
      <p>Description: {schemeDetails.desc}</p>
     
      {schemeDetails.audio && (
        <audio controls>
          <source src={`data:audio/mpeg;base64,${schemeDetails.audio}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default SchemeDetails;
