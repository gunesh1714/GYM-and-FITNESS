import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { PlanProvider } from './Components/Context/PlanContext';
import { AuthProvider } from './Components/AuthContext';
import { NutrientProvider } from './Components/Context/NutrientContext';
import { CalorieProvider } from './Components/Context/CalorieContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NutrientProvider>
    <PlanProvider>
    <AuthProvider>
      <CalorieProvider>
       <App />
       </CalorieProvider>
    </AuthProvider>
    </PlanProvider>
    </NutrientProvider>
  </React.StrictMode>
);
