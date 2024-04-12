import React from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import Profile from './components/profile.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/loginPage.js';
import Editpage from './components/Editpage.js';
import UploadSongPage from './components/UploadSongPage.js';
import Result from './components/Result.js';
import Design from './components/Design.js';
import Favpage from './components/Favpage.js';
import Recentpage from './components/Recentpage.js';
function App() {
  
  const Routes = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/', element: <Home /> },
    { path:'/signupPage', element: <SignupPage />},
    { path:'/profile', element: <Profile />},
    { path:'/loginPage', element: <LoginPage />},
    { path:'profile/edit/:id', element: <Editpage />},
    { path:'/upload', element: <UploadSongPage/>},
    { path:'/result', element: <Result/>},
    { path:'/design', element: <Design/>},
    { path:'/favouritespage', element: <Favpage/>},
    { path:'/recentpage', element: <Recentpage/>}
  ]);
  return (<>
  <RouterProvider router={Routes} />
  </>
    
    
  );
  
 
}

export default App;
