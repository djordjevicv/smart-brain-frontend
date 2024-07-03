import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
  return (
    <div className='pa2'>
      <Tilt className="Tilt br2 shadow-2"
        options={{ max: 100 }}>
        <div className="Tilt-inner pa3">
          <img alt='logo' src={brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;