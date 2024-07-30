import React from 'react'

import '../Styles/ContactUs.css';

import contactUs1 from '../Assets/contactUs1.jpg'

import HomePageCardButton from './HomePageCardButton';

const ContactUs = () => {
  return (
    <div>
      <div className='contactUs-container'>
        <div className='contactUs-heading'>
            Get in touch :
        </div>
        <div className='contactUs-contact-container'>
            <div className='contactUs-contact-element1'>
            <div className='contactUs-contact-element1-elements'>
            <input
              placeholder="Fullname"
              class="brutalist-input smooth-type"
              type="text"
            />
            <input
              placeholder="E-mail"
              class="brutalist-input smooth-type"
              type="text"
            />
            <input
              placeholder="Message"
              class="brutalist-input smooth-type"
              type="text"
            />
          
            <HomePageCardButton
            message="Send message"
            />

            </div>
            </div>
            <div className='contactUs-contact-element2'>
                <img src={contactUs1} alt="" className='contactUs-contact1'/>
                <div className='contactUs-moving-text1'>
                <marquee  scrollamount="25">
                let.us.know.what.you.think.
                </marquee>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
