import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

const MusicPlayer = () => {
    
  const [vidtitle, setVidtitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [key, setKey] = useState(0); // Key to force remount of ReactPlayer
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);

 

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
        <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexDirection: 'column',
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
    );
};
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

export default MusicPlayer;
