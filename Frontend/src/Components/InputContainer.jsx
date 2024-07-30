import React from 'react';
import '../Styles/InputContainer.css';

const InputContainer = ({ name,placeholder,type,icon }) => {
  return (
    <div className="input__container">
      <div className="shadow__input"></div>
      <button className="input__button__shadow">
            <img src={icon} alt="icon" className='relative h-9 w-9'/>
      </button>
      <input
        type={type}
        name={name}
        className="input__search"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputContainer;
