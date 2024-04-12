import React from 'react';
import { Carousel } from "flowbite-react";

const Rousel = () => {
  return (
    <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ width: '100%', height: '600px' }}> {/* Adjust the height as needed */}
        <Carousel slideInterval={2000}>
          <img className='w-full h-full object-cover' src="https://images2.alphacoders.com/953/953864.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <img className='w-full h-full object-cover' src="https://4kwallpapers.com/images/wallpapers/lana-del-rey-portrait-digital-composition-american-singer-4480x2520-6664.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="https://images7.alphacoders.com/100/1000292.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="https://4kwallpapers.com/images/wallpapers/billie-eilish-american-singer-2021-5k-8k-5120x2880-6487.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iKp_Tvsd7Feo/v1/-1x-1.jpg" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Carousel>
      </div>
    </div>
  );
};

export default Rousel;
