import React, { useState, useEffect } from 'react';
import './CalorieBurnerTracker.css';
import { usePlan } from '../Context/PlanContext';
import { useCalories } from '../Context/CalorieContext';

const CalorieBurnerTracker = ({ planId }) => {
  const { calories, resetCalories } = useCalories();
  const { plan,updatePlan } = usePlan();

  const [localPlan, setLocalPlan] = useState(plan || {
    dailyTarget: 0,
    dailyTargetAchieved: 0,
    weeklyTarget: 0,
    weeklyTargetAchieved: 0,
    monthlyTarget: 0,
    monthlyTargetAchieved: 0,
  });

  useEffect(() => {
    if (planId) {
      fetchPlanDetails(planId);
    }
  }, [planId]);

  useEffect(() => {
    if (plan) {
      setLocalPlan(plan);
    }
  }, [plan]);

  const fetchPlanDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/plans/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plan details');
      }
      const data = await response.json();
      setLocalPlan(data);
      updatePlan(data); // Update the context state
      resetCalories(); // Reset calories on fetch
    } catch (error) {
      console.error('Error fetching plan details:', error);
    }
  };


  const updatePlanDetails = async (updatedPlan) => {
    try {
      const response = await fetch(`http://localhost:8080/api/plans/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      if (!response.ok) {
        throw new Error('Failed to update plan');
      }

      const updatedPlanData = await response.json();
      setLocalPlan(updatedPlanData);
      updatePlan(updatedPlanData); // Update the context state
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleUpdateTarget = (timeframe) => {
    const updatedPlan = {
      ...localPlan,
      [`${timeframe}Target`]: localPlan[`${timeframe}Target`],
    };

    // Calculate weekly and monthly targets based on daily target
    if (timeframe === 'daily') {
      updatedPlan.weeklyTarget = localPlan.dailyTarget * 7;
      updatedPlan.monthlyTarget = localPlan.dailyTarget * 30;
    }

    updatePlanDetails(updatedPlan);
  };

  const handleUpdateBurned = (timeframe) => {
    let updatedPlan = { ...localPlan };

    if (timeframe === 'daily' && calories > 0) {
      updatedPlan[`${timeframe}TargetAchieved`] += calories; // Add calories to dailyTargetAchieved
      updatedPlan.weeklyTargetAchieved += calories;
      updatedPlan.monthlyTargetAchieved += calories;
    } else {
      updatedPlan[`${timeframe}TargetAchieved`] += localPlan[`${timeframe}Burned`] || 0; // Add burned value
      updatedPlan.weeklyTargetAchieved += localPlan[`${timeframe}Burned`] || 0; // Add burned value
      updatedPlan.monthlyTargetAchieved += localPlan[`${timeframe}Burned`] || 0; // Add burned value
    }

    updatePlanDetails(updatedPlan);
  };

  const handleTargetChange = (e) => {
    const { name, value } = e.target;
    setLocalPlan((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  return (
    <div className="calorie-burner-tracker">
      <h1><strong>Calorie Burner Tracker</strong></h1>
      <div className="tracker-sections">
        {['daily', 'weekly', 'monthly'].map((timeframe) => (
          <div key={timeframe} className="tracker-section">
            <h2>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</h2>
            <div className="input-group">
              <div className="label-wrapper">
                <label>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Target: </label>
              </div>
              <input
                type="number"
                name={`${timeframe}Target`}
                value={localPlan[`${timeframe}Target`]}
                onChange={handleTargetChange}
              />
            </div>
            <div className="input-group">
              <div className="label-wrapper">
                <label>{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Burned: </label>
              </div>
              <input
                type="number"
                name={`${timeframe}Burned`}
                value={localPlan[`${timeframe}Burned`] || 0} // Ensure it's not undefined
                onChange={handleTargetChange}
              />
            </div>
            <div className="button-group">
              <button onClick={() => handleUpdateTarget(timeframe)}>Set Target</button>
              <button onClick={() => handleUpdateBurned(timeframe)}>Update Burned</button>
            </div>
            <progress value={localPlan[`${timeframe}TargetAchieved`]} max={localPlan[`${timeframe}Target`]}></progress>
            <div className="progress-details">
              <span>Achieved: {localPlan[`${timeframe}TargetAchieved`]}</span> /
              <span> Target: {localPlan[`${timeframe}Target`]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalorieBurnerTracker;