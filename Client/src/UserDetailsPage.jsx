// src/components/UserDetailsPage.js
import React from 'react';
import { useSelector } from 'react-redux';

const UserDetailsPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2>User Details Page</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Crop: {user.crop}</p>
          <p>Land Size: {user.landSize}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
