import React, { useContext } from 'react';
import './Rank.css'
import homeContext from '../../utilities/homeContext';
const Rank = () => {
  const name = useContext(homeContext).user.name;
  const entries = useContext(homeContext).user.entries;

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