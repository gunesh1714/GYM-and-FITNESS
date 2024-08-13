import React, { useState, useEffect } from 'react';
import '../Styles/ProfilePage.css';
import ProfileCard from '../Components/ProfileCard';
import Navbar from '../Components/Navbar';
import SearchComponent1 from '../Components/SearchComponent1';
import Excersises from '../Components/ExcerciseComponents/Excersises';
import DietPlanner from '../Components/DietPlanner/DietPlanner';
import LiveMeeting from '../Components/LiveMeeting/LiveMeeting';
import Footer from '../Components/Footer';
import FoodIntakeCounter from '../Components/FoodIntakeCounter';
import CalorieBurnerTracker from '../Components/CalorieBurner/CalorieBurnerTracker';
import ReviewComponent from '../Components/ReviewComponent';

import profileicon1 from '../Assets/profileicon1.png';
import profileicon2 from '../Assets/profileicon2.png';
import dietBanner from '../Assets/dietBanner.png';
import meetingVideo from '../Assets/meetingVideo.mp4';
import foodIntakeVideo from '../Assets/foodIntakeVideo.mp4';

import { useAuth } from '../Components/AuthContext';
import { usePlan } from '../Components/Context/PlanContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const {updatePlan} = usePlan();

  const [searchExcercise, setSearchExcercise] = useState('');
  const [shift, setShift] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      fetchUserAndPlan();
    }
  }, [user]);

  const fetchUserAndPlan = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/findByEmail?email=${user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserData(data);
      updatePlan(data.plan);
      setUserPlan(data.plan); // Assuming 'plan' is the property in the response

    } catch (error) {
      console.error('Error fetching user and plan:', error);
    }
  };

  const handleSearch = () => {
    setShift(true);
  };

  return (
    <div className='profile-background'>
      <div className="profile-header">
        <h1>Welcome to Your Fitness Journey!</h1>
        <p>Transform your goals into achievements. Embrace the challenge, celebrate the progress, and live your best life.</p>
      </div>
      <div className='profile-card-container'>
        <div className='profile-card'>
          {userData && (
            <ProfileCard
              name={userData.userName}
              email={userData.email}
              age={userData.age}
              gender={userData.gender}
              bmi={userData.bmi}
              plan={userPlan ? userPlan.planName : "No Plan"} 
            />
          )}
        </div>
        <div className='profile-icon-container'>
          <img src={profileicon1} alt="profileicon1" className='profile-icon-1'/>
          <img src={profileicon2} alt="profileicon2" className='profile-icon-2'/>
        </div>

        <div className='profile-search1' onChange={(e) => { setSearchExcercise(e.target.value) }}>
          <SearchComponent1/>
          <button className="cssbuttons-io-button" onClick={handleSearch}>
            Search
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
        <div>

          <div>
            {!shift && 
            <Excersises title="Few Exercises to practice : "/>}
            {shift && 
            <Excersises title="Search Results : " input={searchExcercise}/>
            }
          </div>

          {userPlan && (
            <CalorieBurnerTracker planId={userPlan.planId} />
          )}
        </div>
      </div>
      <div>
        <h1 className='profile-dietplanner-heading'>Diet Planner :</h1>
        <div className='profile-diet-banner'>
          <div className='profile-diet-banner-text'>
            <h1>EAT</h1>
            <h2>HEALTHY</h2>
            <h3>BE HEALTHY !!</h3>
            <p>Search for a recipe below :</p>
            <div className='profile-diet-banner-line'></div>
          </div>
          <img src={dietBanner} alt="Diet Banner"/>
        </div>

        <div className='profile-foodIntakeCounter-container'> 
          <div className='profile-foodIntakeCounter-counter'>
          {userPlan && (
            <FoodIntakeCounter planId={userPlan.planId}/>
          )}
          </div>
          <video  
            className='foodIntake-video'
            src={foodIntakeVideo} 
            autoPlay 
            loop 
            muted 
          />
        </div> 

        <DietPlanner/>
      </div>

      <div>
        <h1 className='profile-dietplanner-heading'>Schedule a live session :</h1>
        <div className='meeting-container'>
          <div className='meeting-schedule-container'>
            <LiveMeeting/>
          </div>
          <video  
            className='meeting-video'
            src={meetingVideo} 
            autoPlay 
            loop 
            muted 
          />
        </div>
      </div>

      <div>
      <h1 className='profile-dietplanner-heading'>Write a review :</h1>
      <ReviewComponent/>
      </div>

      <div className='mt-10'>
        <Footer/>
      </div>
    </div>
  );
}

export default ProfilePage;
