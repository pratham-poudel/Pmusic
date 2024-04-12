import React, { useState } from 'react';
import {   useNavigate, useParams } from 'react-router-dom';


const SignupPage = () => {
  const {id} = useParams();
  console.log(id);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Construct the user data object
      const userData = {
        username: username,
        email: email,
      };
    
      try {
        const response = await fetch(`${id}`, { // Using userId in the fetch URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('User registered:', data);
          navigate('/profile', { state: { user: data } });
        } else {
          console.error('Registration failed:', response.statusText);
          navigate('/');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Edit Info</button>
      </form>
    );
}

export default SignupPage;
