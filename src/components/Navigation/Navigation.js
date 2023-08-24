import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn, changeOpen}) => {
    if (isSignedIn) {
      return (
        <nav className='flex justify-between items-center'>
          <Logo />
          <div className='flex'>
            <p onClick={changeOpen}
              className='f5 f4-ns link dim black underline pa3 pointer'
            >Leaderboard</p>
            <p onClick={() => {
              onRouteChange('signout');
              localStorage.setItem('userJSON', '');
            }}
              className='f5 f4-ns link dim black underline pa3 pointer'
            >Sign Out</p>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className='flex justify-between items-center'>
          <Logo />
          <div className='flex'>
            <p onClick={() => onRouteChange('signin')} className='f5 f4-ns link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f5 f4-ns link dim black underline pa3 pointer'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;