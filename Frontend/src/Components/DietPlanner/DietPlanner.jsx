import React, { useState } from 'react';
import axios from 'axios';
import { useNutrients } from '../Context/NutrientContext';
import './Styles/DietPlanner.css';

const DietPlanner = () => {

  const { updateNutrientValues } = useNutrients();

  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  // Handle recipe search
  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          query: query,
          number: 12,
          addRecipeInformation: true, 
          addRecipeNutrition: true, 
          apiKey: '9c8d916609cb41e4974f6d577fd6dbb3'
        }
      });
      setMeals(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch details of a selected meal
  const fetchMealDetails = async (id) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: '9c8d916609cb41e4974f6d577fd6dbb3'
        }
      });
      setMealDetails(response.data); // Save detailed information
      setSelectedMealId(id); // Store only the ID of the selected meal
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  // Find the selected meal data
  const selectedMeal = meals.find(meal => meal.id === selectedMealId);

  // Update nutrient values
const updateNutrients = () => {
  if (selectedMeal && selectedMeal.nutrition && selectedMeal.nutrition.nutrients) {
    const nutrition = selectedMeal.nutrition.nutrients;
    const calorieInfo = nutrition.find(nutrient => nutrient.name.toLowerCase() === 'calories');
    const proteinInfo = nutrition.find(nutrient => nutrient.name.toLowerCase() === 'protein');
    const carbInfo = nutrition.find(nutrient => nutrient.name.toLowerCase() === 'carbohydrates');

    const updatedCalories = calorieInfo ? calorieInfo.amount : 0;
    const updatedProteins = proteinInfo ? proteinInfo.amount : 0;
    const updatedCarbs = carbInfo ? carbInfo.amount : 0;

    const handleUpdateNutrients = () => {
      const newNutrients = {
        calories: updatedCalories,  // Replace with actual value
        proteins: updatedProteins,   // Replace with actual value
        carbs: updatedCarbs,      // Replace with actual value
      };
  
      updateNutrientValues(newNutrients);
    };

    handleUpdateNutrients();

  } else {
    console.error('Nutrition information is not available.');
  }
};


  return (
    <div className='diet-planner'>
      <div className="diet-search-section">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="meals-section">
        {meals.map((meal) => (
          <div 
            key={meal.id} 
            className="meal-card" 
            onClick={() => fetchMealDetails(meal.id)}
          >
            <h2>{meal.title}</h2>
            <img src={meal.image} alt={meal.title} />
          </div>
        ))}
      </div>
      <div className='selected-meal'>
        {selectedMeal && (
          <div className="meal-details">
            <h2><strong>{selectedMeal.title}</strong></h2>
            <img src={selectedMeal.image} alt={selectedMeal.title} />
            <p dangerouslySetInnerHTML={{ __html: selectedMeal.summary }}></p>
            <h2><strong>Nutrition :</strong></h2>
            {selectedMeal.nutrition ? (
              <table className="nutrition-table">
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Amount</th>
                    <th>% Daily Needs</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMeal.nutrition.nutrients.map((nutrient) => (
                    <tr key={nutrient.name}>
                      <td>{nutrient.name}</td>
                      <td>{nutrient.amount} {nutrient.unit}</td>
                      <td>{nutrient.percentOfDailyNeeds ? nutrient.percentOfDailyNeeds : 'N/A'}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nutrition information not available.</p>
            )}
            {mealDetails && (
              <div className="meal-extra-details">
                <h2><strong>Ingredients :</strong></h2>
                <ul>
                  {(mealDetails.extendedIngredients || []).map((ingredient) => (
                    <li key={ingredient.id || ingredient.name}>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
                <h2><strong>Instructions :</strong></h2>
                <p dangerouslySetInnerHTML={{ __html: mealDetails.instructions || 'Instructions not available.' }}></p>
                <button onClick={updateNutrients}>Yes I had this meal !!</button>
              </div>
            )}
          </div>
        )}
        {!selectedMeal && <p>Please select a meal to see the details.</p>}
      </div>
    </div>
  );
};

export default DietPlanner;
