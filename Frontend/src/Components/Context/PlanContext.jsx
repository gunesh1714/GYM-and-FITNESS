import React, { createContext, useContext, useState } from 'react';

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);

  const updatePlan =(updatedPlan)=> {
    setPlan(updatedPlan)
  }

  return (
    <PlanContext.Provider value={{ plan, updatePlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
