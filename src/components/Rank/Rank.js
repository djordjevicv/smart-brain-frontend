import React from 'react';
import './Rank.css'
const Rank = ({ name, entries }) => {
  return (
    <div className='Rank mb4 mt4'>
      <div className='white f4'>
        <span className='b'>{`${name}`}</span>, your current <span className='i'>face-detection count</span> is...
      </div>
      <div className='white f2 b'>
        {`${entries}`}
      </div>
    </div>
  );
}

export default Rank;