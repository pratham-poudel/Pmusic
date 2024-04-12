import React from 'react'
import { NavLink } from 'react-router-dom';


const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      {/* You can add your signup form here */}
      <NavLink to="/loginPage" class="btn btn-primary">Login</NavLink>
    </div>
  );
}

export default Login