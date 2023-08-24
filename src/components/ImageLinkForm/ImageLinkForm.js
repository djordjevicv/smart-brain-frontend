import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f5 b mb2'>
        Insert a link of the picture, and this Magic Brain will find a face on it.
      </p>
      <div className='center'>
        <div className='form pa3 br3 shadow-5 flex justify-center items-center'>
          <input className='f5 pa2 w-60 db center' type='text' onChange={onInputChange}/>
          <button
            className='w-30 grow f5 link pv2 db white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;