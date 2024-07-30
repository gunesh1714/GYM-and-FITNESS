import React, { useState } from 'react';

import '../Styles/ProfilePage.css';

import ProfileCard from '../Components/ProfileCard';
import Navbar from '../Components/Navbar';
import SearchComponent1 from '../Components/SearchComponent1';
import CalarieComponent from '../Components/CalarieComponent';

import profileicon1 from '../Assets/profileicon1.png';
import profileicon2 from '../Assets/profileicon2.png';

const ProfilePage = () => {

const [searchExcercise,setSearchExcercise] = useState('');

  return (
    <div className='profile-background'>
      <div className='profile-welcome'>
        Welcome !!
      </div>
      <div className='profile-card-container'>
      <div className='profile-card'>
        <ProfileCard />
      </div>
      <div className='profile-icon-container'>
      <img src={profileicon1} alt="profileicon1" className='profile-icon-1'/>
      <img src={profileicon2} alt="profileicon2" className='profile-icon-2'/>
      </div>
      <div className='profile-search'>

      </div>

      <div className='profile-food-intake-display'>

      </div>

      <div className='profile-search1' onChange={(e)=>{setSearchExcercise(e.target.value)}}>
        <SearchComponent1/>
      </div>
      <div className='profile-calorie-container'>
        <CalarieComponent/>
      </div>
      </div>
      
    </div>
  );
}

export default ProfilePage;
