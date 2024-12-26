import React from 'react';

function Profile({ user, handleLogout }) {
  return (
    <div>
      <h2>Welcome, {user}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
