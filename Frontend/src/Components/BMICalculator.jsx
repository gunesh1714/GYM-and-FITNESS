import React, { useState } from 'react';

import SecondInputContainer from './SecondInputContainer';
import BMICalculatorButton from './BMICalculatorButton';

import height from '../Assets/height.png';
import weight from '../Assets/weight.png';

import '../Styles/BMICalculator.css';

const BMICalculator = () => {
  const [weightvalue, setWeightValue] = useState('');
  const [heightvalue, setHeightValue] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [plan, setPlan] = useState('');

  const calculateBMI = () => {
    const weightInKg = parseFloat(weightvalue);
    const heightInMeters = parseFloat(heightvalue) / 100;
    if (weightInKg > 0 && heightInMeters > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));

      let bmiMessage = '';
      let bmiPlan = '';
      if (bmiValue < 18.5) {
        bmiMessage = 'Underweight';
        bmiPlan='Intermediate';
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        bmiMessage = 'Normal weight';
        bmiPlan='Basic';
      } else if (bmiValue >= 24.9 && bmiValue <= 29.9) {
        bmiMessage = 'Overweight';
        bmiPlan='Advanced';
      } else {
        bmiMessage = 'Obesity';
        bmiPlan='Advanced';
      }
      setMessage(bmiMessage);
      setPlan(bmiPlan);
    } else {
      setMessage('Please enter valid weight and height.');
    }
  };

  return (
    <div className='BMICalculator-container'>
    <div className='BMICalculator-calc'>
      <h2 className='BMICalculator-heading'>BMI Calculator</h2>
      <div>
        <p className='BMICalculator-subheading'>
        Weight (kg):
        </p>
        <div onChange={(e) => setWeightValue(e.target.value)}>
        <SecondInputContainer
        icon={weight}
        type="number"
        name="weight"
        placeholder="Enter weight"
        />
        </div>
      </div>
      <div>
        <p className='BMICalculator-subheading'>
        Height (cm):
        </p>
        <div onChange={(e) => setHeightValue(e.target.value)}>
        <SecondInputContainer
        icon={height}
        type="number"
        name="height"
        placeholder="Enter height"
        />
        </div>
      </div>
      <div onClick={calculateBMI}>
      <BMICalculatorButton message="Calculate BMI"/>
      </div>
      {
        !bmi && (
          <div className='BMICalculator-bmi'>
            <h3>Your BMI and Recommended plan will apprear here.</h3>
          </div>
        )
      }
      {bmi && (
        <div className='BMICalculator-bmi'>
          <h3>Your BMI: {bmi}</h3>
          <p>&emsp;&emsp;&emsp; {message}</p>
          <h3>Recommended plan :</h3>
          <p>&emsp;&emsp;&emsp; {plan}</p>
        </div>
      )}
      </div>    
    </div>
  );
};

export default BMICalculator;
