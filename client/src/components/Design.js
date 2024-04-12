import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import './style.css'
import Shery from "sheryjs"; /*Don't use if using CDN*/
import { Carousel } from "flowbite-react";


Shery.mouseFollower();
// Shery.imageEffect("#back",{style:5, gooey:true,debug:true});


const Design = ({info}) => {
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Redirect to result page with search query as URL parameter
        window.location.href = `/result?search=${encodeURIComponent(search)}`;
    };
    const signout = async () => {
        try {
          const response = await fetch('https://pmusic.onrender.com/logout'); // Assuming your backend endpoint is '/api/profile'
          if (response.ok) {
              const data = await response.json();
              console.log(data)
              window.location.href = '/';
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } 
      };

      const favredirect = () => {
        window.location.href = '/favouritespage';
      }
      const recredirect = () => {
        window.location.href = '/recentpage';
      }



    return (
        <>
            <div id="main">
                <div id="back">
                    <Carousel slideInterval={2000}>
                        <img className='w-full h-full object-cover' src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iKp_Tvsd7Feo/v1/-1x-1.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <img className='w-full h-full object-cover' src="https://images.hdqwalls.com/wallpapers/ariana-grande-allure-photoshoot-ks.jpg  " alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <img src="https://wallpapercg.com/download/taylor-swift-4096x2048-16512.jpeg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <img src="https://4kwallpapers.com/images/wallpapers/billie-eilish-american-singer-2021-5k-8k-5120x2880-6487.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <img src="https://images6.alphacoders.com/101/1010615.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Carousel>
                </div>
                <div id="top">
                    <div id="workingarea">
                        <div id="nav">
                            <div id="nleft">
                                
                                <button onClick={favredirect} style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}>Favourites</button><button onClick={recredirect} style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}>Recently Played</button>
                            </div>
                            <div id="nright">
                            <a href='https://www.instagram.com/prathampoudel/'>Contact</a><button onClick={signout} style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}>Logout</button>
                            </div>


                        </div>
                        <div id="hero">
                            <div id="heroleft">
                                <div class="elem">
                                    <h1>Welcome</h1>
                                    
                                </div>
                                <div class="elem">
                                    <h1>{info.username}</h1>
                                    
                                </div>
                                <div class="elem">
                                    <h1>Rock it !! </h1>

                                </div>


                                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '0 auto', marginBottom: '20px', padding: '0 20px' }}>
                    <input  type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', outline: 'none', marginRight: '10px' }} placeholder="Search for Music" />
                    <button style={{ padding: '8px 16px',width:'90px' ,border: 'none', borderRadius: '4px', backgroundColor: 'grey', color: 'white', fontSize: '20px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} type="submit">Search</button>
                </form>
                            </div>
                            <div id="heroright">
                                <p>Hey this is Pratham , this website was created only for educational purpose</p>
                                <div id="imagediv">

                                </div>
                                <p>Welcome to our music streaming website! Enjoy unlimited access to your favorite songs without any subscription fees. With our vast library of music, you'll never run out of tunes to listen to.</p>
<p>Discover new artists, create personalized playlists, and share your favorite tracks with friends. Our platform offers a seamless listening experience, whether you're on your computer, tablet, or smartphone.</p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default Design