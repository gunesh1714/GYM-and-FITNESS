import React from 'react';
import '../Styles/SecondInputContainer.css';

const SecondInputContainer = ({ name, placeholder, type, icon, color }) => {
  return (
    <div className="second__input__container">
      <div className="second__shadow__input"></div>
      <button className="second__input__button__shadow">
        <img src={icon} alt="icon" className='relative h-9 w-9'/>
      </button>
      <input
        type={type}
        name={name}
        className="second__input__search"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SecondInputContainer;
