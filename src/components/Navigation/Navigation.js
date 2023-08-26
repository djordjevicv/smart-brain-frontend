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
              className='f5 f4-ns link dim black underline pa3 pointer black'
            >Leaderboard</p>
            <p onClick={() => {
              onRouteChange('signout');
              localStorage.setItem('userJSON', '');
            }}
              className='f5 f4-ns link dim black underline pa3 pointer black'
            >Sign Out</p>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className='flex justify-between items-center'>
          <Logo />
          <div className='flex'>
            <p onClick={() => onRouteChange('signin')} className='f5 f4-ns link dim black underline pa3 pointer black'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f5 f4-ns link dim black underline pa3 pointer black'>Register</p>
          </div>
        </nav>
      );
    }
}

export default Navigation;