import React from 'react'
import { NavLink } from 'react-router-dom';


const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      {/* You can add your signup form here */}
      <NavLink to="/signupPage" class="btn btn-primary">Signup</NavLink>
    </div>
  );
}

export default Signup