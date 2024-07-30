import React from 'react'
import '../Styles/HomePage.css'

import HomePageCard from './HomePageCard';
import BMICalculator from './BMICalculator';

import homepicture1 from '../Assets/homepicture1.jpg';

import homepage_video1 from '../Assets/homepage_video1.mp4';
import bmivideo from '../Assets/bmivideo.mp4';
import ContactUs from './ContactUs';

const HomePage = () => {
  

  return (
    <div className='homepage-container'>

      <div className='homepage-picture1-container'>
        <div className='homepage-picture1'>
          <div>
            <img src={homepicture1} alt="homepicture" className='homepage-picture-1'/>
          </div>  
          <div className='homepage-picture1-overlay1'>
            gain results !!
          </div>
          <div className='homepage-picture1-overlay2'>
            select a program now ..
          </div>
        </div>
          <div className='homepage-quote-side'>
            <div className='homepage-quote-text'>
              <p className='homepage-quote-letter'>#</p>
              <p className='homepage-quote-letter'>G</p> 
              <p className='homepage-quote-letter'>E</p> 
              <p className='homepage-quote-letter'>T</p> 
              <p className='homepage-quote-letter'>F</p> 
              <p className='homepage-quote-letter'>I</p> 
              <p className='homepage-quote-letter'>T</p> 
            </div>
          </div>
      </div>
    <div className="homepage-video-container">
      <video 
        className="homepage-video1" 
        src={homepage_video1} 
        autoPlay 
        loop 
        muted 
      />
    </div>

    <div className='homepage-video-overlay1'>
      <div className='homepage-video-overlay1-bold'>
      Unlock Your Potential with Tailored Personal Training.
      </div>
      <p className='homepage-video-overlay1-p'>
      Achieve your goals with tailored workouts from our expert trainers. Whether you're chasing peak performance or a healthier lifestyle, we provide the motivation and support you need. Start today and transform into a stronger, fitter, and more confident you!
      </p>
    </div>

  <div className="circle-container">
  <div className="rotating-circle">
    <p className="circle-text">D</p>
    <p className="circle-text">R</p>
    <p className="circle-text">E</p>
    <p className="circle-text">A</p>
    <p className="circle-text">M</p>
    <p className="circle-text">B</p>
    <p className="circle-text">I</p>
    <p className="circle-text">G</p>
    <p className="circle-text">⦿</p>
    <p className="circle-text">W</p>
    <p className="circle-text">O</p>
    <p className="circle-text">R</p>
    <p className="circle-text">K</p>
    <p className="circle-text">H</p>
    <p className="circle-text">A</p>
    <p className="circle-text">R</p>
    <p className="circle-text">D</p>
    <p className="circle-text">⦿</p>
  </div>
</div>
        <div className='homepage-moving-text1'>
          <marquee  scrollamount="25">
            workout.live.repeat.move.breath.
          </marquee>
        </div>

        <div className='homepage-bmi-container'>
          <div>
          <video 
          className="homepage-bmi-video" 
          src={bmivideo} 
        autoPlay 
        loop 
        muted 
      />
          </div>
          <div className='homepage-bmi'>
          <BMICalculator/>
          </div>
        </div>

        <div>
          <h1 className='homepage-plan-heading'>
            Choose your plan now :
          </h1>
        </div>

        <div className='homepage-card-container'>
          <div className="homepage-card-transition">
          <HomePageCard
          bgcolor="#E5989B" 
          title="Basic"
          bestfor="Best for beginners"
          price="3199"
          months="3"
          feature1="- Relaxed workouts"
          feature2="- Beginner friendly"
          feature3="- Guided programs"
          />
          </div>
          <div className="homepage-card-transition">
          <HomePageCard
          bgcolor="#B5838D" 
          title="Intermediate"
          bestfor="Best for experienced"
          price="6399"
          months="6"
          feature1="- Varied workouts"
          feature2="- Structured progression"
          feature3="- Proper diet plan"
          />
          </div>
          <div className="homepage-card-transition">
          <HomePageCard
          bgcolor="#FFB4A2" 
          title="Advanced"
          bestfor="Best for gymrats"
          price="9999"
          months="9"
          feature1="- Full access"
          feature2="- Whole body transformation"
          feature3="- One-on-one sessions"
          />
          </div>
        </div>

        <div className='homepage-contact-us'> 
          <ContactUs/>
        </div>

        <footer className='homepage-footer'>
          Hello
        </footer>

</div>
  )
}

export default HomePage
