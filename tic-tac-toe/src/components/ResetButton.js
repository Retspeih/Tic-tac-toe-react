import React from 'react';
import './ResetButton.css';

const ResetButton = ({reset}) => {
  return (
   <button className="reset-btn" onClick={reset}>Reset</button>
  )
}

export default ResetButton;