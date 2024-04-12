import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const FavButton = ({ vidId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mainId, setMainId] = useState('');
  
  const addtofav = async () => {

    const userData = {
      vidId: vidId,
    };

    try {
      const response = await fetch('https://pmusic.onrender.com/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setMainId(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const buttonStyle = {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    color: isHovered ? 'pink' : 'red',
    border: 'solid',
    padding: '10px',
    borderRadius: '30px',
  };

  return (
    <>
      <button
        onClick={addtofav}
        style={buttonStyle}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <FaHeart style={{ marginRight: '5px' }} />
        Add to Favorites

      </button>
      {mainId && <p>Added Succesfully</p>}
    </>


  );
};

export default FavButton;