import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://node-react-app-t0m3.onrender.com/logout', {
        method: 'GET', // Or 'GET' depending on your server implementation
        headers: {
          'Content-Type': 'application/json'
          // You may need to include additional headers like Authorization if required
        },
        // Optionally, you can include any data required for the logout process
        // For example, tokens, user IDs, etc.
        // body: JSON.stringify({ userId: '123' })
      });

      if (response.ok) {
        console.log('User logged out successfully');
        navigate('/'); // Redirect the user to the login page after logout
      } else {
        console.error('Logout failed:', response.statusText);
        // Handle logout failure if necessary
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle any errors that occur during logout
    }
  };

  return (
    <NavLink to='/logout' onClick={handleLogout}>
      Logout
    </NavLink>
  );
};

export default LogoutButton;
