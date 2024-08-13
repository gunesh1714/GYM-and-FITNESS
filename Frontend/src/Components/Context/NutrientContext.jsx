import React, { createContext, useState, useContext } from 'react';

const NutrientContext = createContext();

export const NutrientProvider = ({ children }) => {
  const [nutrients, setNutrients] = useState({
    calories: 0,
    proteins: 0,
    carbs: 0,
  });

  const resetNutrients = () => {
    setNutrients({ calories: 0, proteins: 0, carbs: 0 });
  };

  const updateNutrientValues = (newNutrients) => {
    setNutrients(prevNutrients => ({
      calories: newNutrients.calories || prevNutrients.calories,
      proteins: newNutrients.proteins || prevNutrients.proteins,
      carbs: newNutrients.carbs || prevNutrients.carbs,
    }));
  };

  return (
    <NutrientContext.Provider value={{ nutrients, setNutrients,updateNutrientValues,resetNutrients }}>
      {children}
    </NutrientContext.Provider>
  );
};

export const useNutrients = () => useContext(NutrientContext);
