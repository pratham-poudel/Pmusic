import React from 'react';

const PlayButton = ({ songName }) => {
  const playSong = () => {
    console.log(`Playing song: ${songName}`);
    // audio.play();
  };

  return (
    <button type="button" onClick={playSong}>Play</button>
  );
};

export default PlayButton;
