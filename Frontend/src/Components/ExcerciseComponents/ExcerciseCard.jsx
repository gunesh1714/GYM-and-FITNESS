import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/excerciseCard.css';

const ExcerciseCard = ({ title, bodyPart, gifUrl, target, exercise }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/excerciseDetails', { state: { exercise } });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <div className='excercisecard-container' onClick={handleClick}>
        <h1 className='excercisecard-heading'><strong>{capitalizeFirstLetter(title)} :</strong></h1>
        <img 
          src={gifUrl} 
          alt={title} 
          className='excercisecard-gif' 
        />
        <div className='excercisecard-content'>
          <div><strong>Body Part :</strong></div>
          <p>{capitalizeFirstLetter(bodyPart)}</p>
        </div>
        <div className='excercisecard-content'>
          <div><strong>Target :</strong></div>
          <p>{capitalizeFirstLetter(target)}</p>
        </div>
      </div>
    </div>
  );
};

export default ExcerciseCard;
