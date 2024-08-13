import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';
import { usePlan } from '../Context/PlanContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PomodoroTimer = () => {

  const MySwal = withReactContent(Swal);

  const { plan } = usePlan();

  const [data,setData] = useState(null);
  const [workTime, setWorkTime] = useState(5);
  const [breakTime, setBreakTime] = useState(2);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesPerMinute, setCaloriesPerMinute] = useState(0.15);

  const handleUpdateCalories = async () => {

    const updatePlanDetails = async (updatedPlan) => {
      try {
        const response = await fetch(`http://localhost:8080/api/plans/${plan.planId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPlan),
        });

        MySwal.fire({
          title: "Calories got updated successfully !!",
          text: 'Continue your workout.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        if (!response.ok) {
          throw new Error('Failed to update plan');
        }
      } catch (error) {
        console.error('Error updating plan:', error);
      }
    };

    try {
      // Fetch the current plan data based on the plan ID
      const response = await fetch(`http://localhost:8080/api/plans/${plan.planId}`);
      const currentPlan = await response.json();

      if (currentPlan) {
        // Update the plan details with the new calories burned
        const updatedPlan = {
          ...currentPlan,
          dailyTargetAchieved: currentPlan.dailyTargetAchieved + caloriesBurned,
          weeklyTargetAchieved: currentPlan.weeklyTargetAchieved + caloriesBurned,
          monthlyTargetAchieved: currentPlan.monthlyTargetAchieved + caloriesBurned,
        };

        // Update the plan in the backend
        updatePlanDetails(updatedPlan);

        setData(updatedPlan);

        // Optionally reset the calories burned
        setCaloriesBurned(0);
      } else {
        console.error('Failed to fetch the plan.');
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        if (!isBreak) {
          setCaloriesBurned((calories) => calories + (caloriesPerMinute / 60)); // Increment calories burned per second
        }
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setTimeLeft(workTime * 60);
        setIsBreak(false);
      } else {
        setTimeLeft(breakTime * 60);
        setIsBreak(true);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isBreak, workTime, breakTime, caloriesPerMinute]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
    setCaloriesBurned(0); // Reset calories burned on reset
  };

  const handleWorkTimeChange = (e) => {
    setWorkTime(e.target.value);
    setTimeLeft(e.target.value * 60);
  };

  const handleBreakTimeChange = (e) => {
    setBreakTime(e.target.value);
  };

  const handleCaloriesPerMinuteChange = (e) => {
    setCaloriesPerMinute(e.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const circleStyle = {
    strokeDasharray: 440, // Set the total length of the circle's stroke
    strokeDashoffset: `calc(440 - (440 * ${timeLeft}) / ${(isBreak ? breakTime : workTime) * 60})`,
  };

  return (
    <div className="pomodoro-timer">
      <h1 className='pomodoro-timer-heading'>{isBreak ? 'Break Time!' : 'Exercise Time!'}</h1>
      <div className="pomodoro-time-inputs">
        <div>
          <label>Exercise Time (minutes):</label>
          <input type="number" value={workTime} onChange={handleWorkTimeChange} disabled={isActive} />
        </div>
        <div>
          <label>Break Time (minutes):</label>
          <input type="number" value={breakTime} onChange={handleBreakTimeChange} disabled={isActive} />
        </div>
        <div>
          <label>Calories Burned Per Minute:</label>
          <input type="number" value={caloriesPerMinute} onChange={handleCaloriesPerMinuteChange} />
        </div>
      </div>
      <div className="pomodoro-timer-circle">
        <svg width="160" height="160">
          <circle cx="80" cy="80" r="70" stroke="lightgray" strokeWidth="10" fill="none" />
          <circle cx="80" cy="80" r="70" stroke="green" strokeWidth="10" fill="none" style={circleStyle} />
        </svg>
        <div className="pomodoro-time-display">{formatTime(timeLeft)}</div>
      </div>
      <div className="pomodoro-controls">
        <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="calories-burned">
        <h2>Total Calories Burned: {caloriesBurned.toFixed(4)}</h2>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 mt-2"
        onClick={handleUpdateCalories}
      >
        Update Calories
      </button>
    </div>
  );
};

export default PomodoroTimer;

