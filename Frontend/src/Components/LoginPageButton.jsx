import React from 'react'

import '../Styles/LoginPageButton.css';

const LoginPageButton = ({message}) => {
  return (
    <div>
      <button className='Login_page_button'><span>
        {message}
        </span></button>
    </div>
  )
}

export default LoginPageButton
