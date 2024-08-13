import React, { useState, useEffect } from 'react';
import '../Styles/FoodIntakeCounter.css';
import { useAuth } from './AuthContext';
import { usePlan } from './Context/PlanContext';
import { useNutrients } from './Context/NutrientContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const FoodIntakeCounter = ({ planId }) => {
    
  const MySwal = withReactContent(Swal);
  const { nutrients, resetNutrients } = useNutrients();
  const { user } = useAuth();
  const { plan, setPlan } = usePlan();
  const [userPlan, setUserPlan] = useState(plan || null);
  const [intake, setIntake] = useState({
    calories: 0,
    proteins: 0,
    carbs: 0,
  });
  const [displayIntake, setDisplayIntake] = useState({
    calories: 0,
    proteins: 0,
    carbs: 0,
  });
  const [category, setCategory] = useState('maintain');

  const targets = {
    lose: { calories: 1500, proteins: 100, carbs: 150 },
    maintain: { calories: 2000, proteins: 150, carbs: 200 },
    gain: { calories: 2500, proteins: 200, carbs: 250 },
  };

  useEffect(() => {
    if (user && user.email) {
      fetchUserAndPlan();
    }
  }, [user]);

  useEffect(() => {
    if (plan) {
      setUserPlan(plan);
      setDisplayIntake({
        calories: plan.calorieIntake || 0,
        proteins: plan.protienIntake || 0,
        carbs: plan.carbsIntake || 0,
      });
    }
  }, [plan]);

  useEffect(() => {
    if (nutrients.calories > 0 || nutrients.proteins > 0 || nutrients.carbs > 0) {
      const updatedPlan = {
        ...userPlan,
        calorieIntake: (userPlan.calorieIntake || 0) + nutrients.calories,
        protienIntake: (userPlan.protienIntake || 0) + nutrients.proteins,
        carbsIntake: (userPlan.carbsIntake || 0) + nutrients.carbs,
      };

      MySwal.fire({
        title: "The values got updated successfully.",
        text: "Hope you had a great meal !!",
        icon: 'success',
        confirmButtonText: 'OK'
      });

      updatePlanDetails(updatedPlan);
      resetNutrients(); 
    }
  }, [nutrients]);

  const fetchUserAndPlan = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/findByEmail?email=${user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserPlan(data.plan);
      setIntake({
        calories: data.plan.calorieIntake || 0,
        proteins: data.plan.protienIntake || 0,
        carbs: data.plan.carbsIntake || 0,
      });
      setDisplayIntake({
        calories: data.plan.calorieIntake || 0,
        proteins: data.plan.protienIntake || 0,
        carbs: data.plan.carbsIntake || 0,
      });
    } catch (error) {
      console.error('Error fetching user and plan:', error);
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
      setUserPlan(updatedPlanData);
      setDisplayIntake({
        calories: updatedPlanData.calorieIntake || 0,
        proteins: updatedPlanData.protienIntake || 0,
        carbs: updatedPlanData.carbsIntake || 0,
      });
      setPlan(updatedPlanData); // Update the context state
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleUpdatePlan = (nutrient) => {
    if (!userPlan) return;

    const updatedPlan = {
      ...userPlan,
      calorieIntake: nutrient === 'calories' ? (userPlan.calorieIntake || 0) + intake.calories : userPlan.calorieIntake,
      protienIntake: nutrient === 'proteins' ? (userPlan.protienIntake || 0) + intake.proteins : userPlan.protienIntake,
      carbsIntake: nutrient === 'carbs' ? (userPlan.carbsIntake || 0) + intake.carbs : userPlan.carbsIntake,
    };
    updatePlanDetails(updatedPlan);
  };

  const handleIntakeChange = (nutrient, value) => {
    setIntake(prevState => ({
      ...prevState,
      [nutrient]: Number(value),
    }));
  };

  return (
    <div className="food-intake-counter max-w-lg mx-auto p-6 shadow-md rounded-lg mb-5" id="counter">
      <h1 className="text-2xl font-semibold mb-4 text-white neon-text">Food Intake Counter</h1>
      <div className="category-select mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-white">Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
        >
          <option value="lose">Losing Weight</option>
          <option value="maintain">Maintaining Weight</option>
          <option value="gain">Gaining Weight</option>
        </select>
      </div>
      <div className="progress-bar-container space-y-4">
        {['calories', 'proteins', 'carbs'].map((nutrient) => (
          <div key={nutrient} className="progress-bar">
            <label htmlFor={nutrient} className="block text-sm font-medium text-white">
              {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}:
            </label>
            <input
              type="number"
              id={nutrient}
              value={intake[nutrient]}
              onChange={(e) => handleIntakeChange(nutrient, e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
            />
            <div className="bar mt-2 bg-gray-700 rounded-full h-6 relative">
              <div
                className={`bar-fill ${nutrient} absolute left-0 top-0 h-full rounded-full neon-bar`}
                style={{
                  maxWidth: '100%',
                  width: `${(displayIntake[nutrient] / targets[category][nutrient]) * 100}%`,
                  backgroundColor: nutrient === 'calories' ? '#f87171' : nutrient === 'proteins' ? '#60a5fa' : '#34d399',
                }}
              />
            </div>
            <div className="target mt-2 text-sm text-white">{displayIntake[nutrient]} / {targets[category][nutrient]}</div>
            <button
              className='btn-update-changes mt-3'
              onClick={() => handleUpdatePlan(nutrient)}
            >
              Update {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodIntakeCounter;
