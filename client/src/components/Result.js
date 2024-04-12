import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FavButton from './Favbutton';
import Navbar from './Navbar';

import Button from './Button';


const ResultPage = () => {
    const [results, setResults] = useState([]);
    const [Ssearch, setSsearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [currentVideoId, setCurrentVideoId] = useState(null); // State to hold current video ID
    const location = useLocation();
    
    const search = new URLSearchParams(location.search).get('search');
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Redirect to result page with search query as URL parameter
        window.location.href = `/result?search=${encodeURIComponent(Ssearch)}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pmusic.onrender.com/getuser'); // Assuming your backend endpoint is '/api/profile'
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);  // Assuming your backend returns user data
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
    }, []);


    useEffect(() => {
        if (search) {
            fetchResults();
        }

    }, []); // Fetch results when search query changes

    const fetchResults = () => {
        const keys = ['AIzaSyCDUPzSuLSvW4_p4hG53ynfb2msXvF5jSc', 'AIzaSyAf5hgml-JpshPwTe3DnTEqzeK_8FIolQI', 'AIzaSyAUJDlrGTsJPjuQpUyb_Hc7wdBIzETXgHg']; // Array of API keys to try
        let keyIndex = 0; // Index to track which key to use

        const fetchWithNextKey = () => {
            const key = keys[keyIndex];

            // Fetch using the current key
            fetch(`https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&q=${search}&part=snippet&maxResults=10`)
                .then(response => {
                    if (!response.ok) {
                        // If response is not OK, switch to the next key
                        keyIndex++;
                        if (keyIndex <= keys.length) {
                            // If there are more keys, try fetching again with the next key
                            fetchWithNextKey();
                        } else {
                            // If no more keys available, handle the error
                            throw new Error('All keys failed');
                        }
                    } else {
                        // Response is OK, proceed with processing the data
                        return response.json();
                    }
                })
                .then(data => {
                    // Process data as usual
                    const videoIds = data.items.map(item => item.id.videoId).join(',');
                    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${videoIds}&part=snippet,statistics`)
                        .then(response => response.json())
                        .then(videoData => {
                            const itemsWithViews = data.items.map((item, index) => ({
                                ...item,
                                views: videoData.items[index].statistics.viewCount
                            }));
                            setResults(itemsWithViews);
                        })
                        .catch(error => {
                            console.error('Error fetching video details:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        };

        // Start fetching with the first key
        fetchWithNextKey();
    };


    return userData ? (
        <div>
            
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Search Results for: {search}</h2>
                        <form  onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '0 auto', marginBottom: '20px', padding: '0 20px' }}>
                            <input type="text" id="search" onChange={(e) => setSsearch(e.target.value)} style={{ flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', outline: 'none', marginRight: '10px' }} placeholder="Search for Music" />
                            <button style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} type="submit">Search</button>
                        </form>
                        <div className="grid grid-cols-1 gap-6">
                            {results.map(item => (
                                <div key={item.id.videoId} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                                    <div className="w-full h-48 object-cover">
                                        <img src={item.snippet.thumbnails.high.url} alt={item.snippet.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-lg font-semibold hover:underline">{item.snippet.title}</p>
                                        <p className="text-gray-600 mt-2">{item.snippet.channelTitle}</p>
                                        <p className="text-gray-600 mt-2">Views: {item.views}</p>
                                    </div>
                                    <div className=' flex items-center justify-around'>
                                    <Button vidId={item.id.videoId} title={item.snippet.title} currentVideoId={currentVideoId} setCurrentVideoId={setCurrentVideoId} />
                                    <FavButton vidId={item.id.videoId} />
                                    </div>
                                   
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </div>
    ) : (
        <a href='/loginPage'>Login</a>
    );
};

export default ResultPage;
