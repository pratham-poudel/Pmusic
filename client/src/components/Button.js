import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

const Button = ({ vidId, title, currentVideoId, setCurrentVideoId }) => {
  const [mainId, setMainId] = useState('');
  const [vidtitle, setVidtitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [key, setKey] = useState(0); // Key to force component re-render
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);

  const video = async () => {
    setCurrentVideoId(vidId); // Set current video ID when video is played
    // Clear the previous video ID
    setMainId('');
    // Set the new video to play
    setMainId(vidId);
    setVidtitle(title);
    
  
    // Update the key to force component re-render
    setKey(prevKey => prevKey + 1);
    setIsPlaying(true); // Move this line inside the if block

    const userData = {
      vidId: vidId,
    };
  
    try {
      const response = await fetch('https://node-react-app-t0m3.onrender.com/recentlyplayed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(vidtitle)
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getDuration() > 0 && !playerRef.current.seeking) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        const calculatedProgress = (currentTime / duration) * 100;
        setProgress(calculatedProgress);
        setCurrentTime(currentTime);
        setDuration(duration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [key]); // Add key to dependency array to trigger effect on key change

  const handleProgressBarClick = (e) => {
    const progressBar = progressBarRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPercentage = clickPosition / progressBarWidth;
    const newTime = duration * clickPercentage;

    playerRef.current.seekTo(newTime, 'seconds');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    console.log('Next track');
  };

  const playPrevTrack = () => {
    console.log('Previous track');
  };

  return (
    <div key={key}>
      <div>
        <button className="play-button" onClick={video} style={{fontSize:'50px'}}>
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
      </div>

      {currentVideoId === vidId && ( // Render only if current video ID matches
        <div>
          <div className="video-container">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                backgroundColor: 'black',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '10px 20px',
                zIndex: 1000,
              }}
            >
              <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${mainId}`}
                width="0px"
                height="0px"
                playing={isPlaying}
                onPause={() => setIsPlaying(false)} // Pause event handler
                onPlay={() => setIsPlaying(true)} // Play event handler
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}>
                <button
                  onClick={playPrevTrack}
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '24px' }}
                >
                  <MdSkipPrevious />
                </button>
                <button
                  onClick={togglePlayPause}
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '24px' }}
                >
                  {isPlaying ? <MdPause /> : <MdPlayArrow />}
                </button>
                <button
                  onClick={playNextTrack}
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '24px' }}
                >
                  <MdSkipNext />
                </button>
              </div>
              <p style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{vidtitle}</p>
              <div className="time-details" style={{ color: 'white', textAlign: 'center' }}>
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div style={{ width: '100%', backgroundColor: '#e1e1e1', borderRadius: '10px', height: '10px', margin: '10px 0' }}>
                <div
                  className="progress-bar-container"
                  onClick={handleProgressBarClick}
                  style={{ backgroundColor: 'blue' }}
                  ref={progressBarRef}
                >
                  <div className="progress" style={{ width: `${progress}%`, backgroundColor: 'red' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Button;
