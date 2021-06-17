import React from 'react';
import './MapPopup.css';

const MapPopup = props => {
    return (
      <div className="popup-boxes">
        <div className="boxes">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.maploc}
        </div>
      </div>
    );
  };

 export default MapPopup 