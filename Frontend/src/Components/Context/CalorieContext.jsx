import React, { createContext, useState, useContext } from 'react';

const CalorieContext = createContext();

export const CalorieProvider = ({ children }) => {
    const [calories, setCalories] = useState(0);

    const resetCalories = () => {
       setCalories(0);
    };
  
    const updateCalorieValues = (newCalories) => {
      setCalories(newCalories);
    };
  
    return (
      <CalorieContext.Provider value={{ calories, setCalories,updateCalorieValues,resetCalories }}>
        {children}
      </CalorieContext.Provider>
    );
  };

export const useCalories = () => useContext(CalorieContext);