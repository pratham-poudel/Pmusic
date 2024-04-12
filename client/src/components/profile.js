import React, { useEffect, useState } from 'react';
import Carousel from './Carosuel';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';
import RecentCard from './RecentCard';
import Favourite from './Favourites';
import Design from './Design';


const Profile = () => {
   
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://node-react-app-t0m3.onrender.com/getuser'); // Assuming your backend endpoint is '/api/profile'
            if (response.ok) {
                const data = await response.json();
                setUserData(data); // Assuming your backend returns user data
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          } finally {
            setLoading(false); // Set loading to false regardless of success or failure
          }
        };
    
        fetchData();
    
        // Cleanup function
        return () => {
          // Cleanup code if necessary
        };
      }, []); // Empty dependency array to trigger the effect only once when the component mounts

    if (loading) {
        return <p>Loading...</p>; // Render a loading indicator while fetching data
    }

    // Render the "hello" message only if userData is not null
    return userData ? (
        <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
              <Design info={userData}/>
                {/* <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '0 auto', marginBottom: '20px', padding: '0 20px' }}>
                    <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', outline: 'none', marginRight: '10px' }} placeholder="Search for Music" />
                    <button style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} type="submit">Search</button>
                </form>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '100px', fontWeight: 'bold', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Trending Now
                </div>
                <Carousel />
                <div className='flex items-center justify-around'> 
                <RecentCard/>
                <Favourite/>
                </div> */}
              </>
            )}
        </div>
    ) : (
        <a href='/loginPage'>Login</a>
    );
};

export default Profile;
