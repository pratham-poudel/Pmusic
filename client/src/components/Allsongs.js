import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        // Fetch songs from the backend
        const fetchSongs = async () => {
            try {
                const response = await axios.get('/viewsongs');
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {songs.map(song => (
                    <li key={song._id}>
                        <span>{song.songName}</span>
                        <audio src={`/playsong/${song.fileName}`} controls />
                    </li>
                ))}
            </ul>
        </div>
    );  
};

export default SongList;
