import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const imageWidth = imageUrl === '' ? `` : 280;
  const imageHeight = imageUrl === '' ? `` : 230;
  return (
    <div className='center ma shadow-2 mt4'
      style={{
        width: "280px",
        height:"230px"
          }}>
      <div className='absolute shadow-2 flex justify-center items-center'
        style={{
          objectFit: "cover",
          width: "280px",
          height: "230px",
          fontSize: "15px"
        }}>
        <img id='inputImage' alt='' src={imageUrl}
          style={{
            maxWidth: "100%",
            maxHeight: "100%"
          }}
          width={imageWidth}
          height={imageHeight}
        />
        <div className='bounding-box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}></div>
        {imageUrl === '' ?
          <span>Your picture will appear here!</span>
          : <span></span>
        }
      </div>
    </div>
  
  );
}

export default FaceRecognition;