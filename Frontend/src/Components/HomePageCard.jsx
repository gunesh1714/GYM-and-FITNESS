import React from 'react'
import '../Styles/HomePageCard.css';
import HomePageCardButton from './HomePageCardButton';

const HomePageCard = ({bgcolor,title,bestfor,price,months,feature1,feature2,feature3}) => {
  return (
    <div style={{backgroundColor:bgcolor}} className='homepagecard-container'>
        <p className='homepagecard-heading'>
            {title}
        </p>
        <p className='homepagecard-bestfor'>
            {bestfor}
        </p>
        <p className='homepagecard-pricing'>
        ₹{price}
            <p className='homepagecard-pricing-month'>
                / {months} Months
            </p>
        </p>
        <p className='homepagecard-line'></p>

        <p className='homepagecard-features'>Features:</p>

        <p className='homepagecard-details'>
        {feature1} <br/>
        {feature2} <br/>
        {feature3} <br/>
        </p>
        <p className='homepagecard-button'>
        <HomePageCardButton message="Click to buy"/>
        </p>
    </div>
  )
}

export default HomePageCard
