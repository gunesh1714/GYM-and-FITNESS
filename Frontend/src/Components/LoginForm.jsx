import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/LoginForm.css';
import '../Styles/Loader1.css';
import '../Styles/Loader2.css';

import InputContainer from './InputContainer';
import SecondInputContainer from './SecondInputContainer';
import LoginPageButton from './LoginPageButton';
import { useAuth } from './AuthContext';

import logo from '../Assets/logo.png';
import padlock from '../Assets/padlock.png';
import email from '../Assets/email.png';
import idcard from '../Assets/idcard.png';
import age from '../Assets/age.png';
import poster2 from '../Assets/poster2.png';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const LoginForm = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [ageInput, setAgeInput] = useState('');

  const [error, setError] = useState('');

  const MySwal = withReactContent(Swal);

  const passwordPattern = /^(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.token) {
        console.log('JWT Token:', data.token); // Log the token
      } else {
        console.error('Token not found in response:', data);
      }

      login(data);

      navigate('/', { state: { user: data } });
    } catch (error) {
      console.error('Error during login:', error);
      MySwal.fire({
        title: "Error during login",
        text: 'Please check your credentials',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleRegister = async () => {
    if (!passwordPattern.test(passwordInput)) {
      setError('Password must be at least 8 characters long, contain at least one special character, and one capital letter.');
      MySwal.fire({
        title: "Invalid Password",
        text: 'Password must be at least 8 characters long, contain at least one special character, and one capital letter.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          userName: usernameInput,
          age: ageInput,
          gender: '', // Adjust if you need to include gender or other fields
        }),
      });

      if (response.status === 409) {
        // Email already exists
        const errorText = await response.text();
        MySwal.fire({
          title: "Error during registration",
          text: errorText, // Display the error message from the server
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      MySwal.fire({
        title: "Registration successful !!",
        text: 'Login to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setShowRegister(false); // Switch to login view after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      MySwal.fire({
        title: "Error during registration",
        text: 'Enter valid details',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  const navigate = useNavigate();

  const [showText, setShowText] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dynamicStyle, setDynamicStyle] = useState("sm:mt-40 sm:ml-12 lg:mt-36 lg:pl-32");
  const [buttonText, setButtonText] = useState("Login >");

  const [switchToggle, setSwitchToggle] = useState(true);
  const [trainerToggle, setTrainerToggle] = useState(false);

  if (trainerToggle) {
    navigate('/trainerLogin');
  }

  if (!switchToggle) {
    navigate('/adminLogin');
  }

  const handleSwitchClick = () => {
    setShowRegister(!showRegister);
  };

  useEffect(() => {
    const loginTimer = setTimeout(() => {
      setShowLogin(true);
    }, 4100);

    const timer = setTimeout(() => {
      setShowText(false);
    }, 4000);

    return () => clearTimeout(timer, loginTimer);
  }, []);

  useEffect(() => {
    if (showRegister) {
      setDynamicStyle("Login-form sm:mt-40 sm:ml-12 lg:mt-1 lg:pl-32");
      setButtonText("Register >");
    } else {
      setDynamicStyle("Login-form sm:mt-40 sm:ml-12 lg:mt-36 lg:pl-32");
      setButtonText("Login >");
    }
  }, [showRegister]);

  return (
    <div className='Login-container'>
      {showText && (
        <h2 className='Login-header font-sans font-bold'>
          <img src={logo} alt="logo" className='Login-Logo' /> &nbsp;
          DynamicFit
        </h2>
      )}
      {showText && (
        <div className="Login-first font-sans font-bold ">
          <div className="loader1"></div>
          <div className='hidden lg:block'>
            Sweat, Smile, Repeat <br />
            Discover Your Best Self <br />
            with Us!
          </div>
        </div>
      )}
      {
        showLogin && (
          <div className='flex'>
            <div className='Login-Name hidden lg:block'>
              <div className='Login-Name-Animation'>
                D <br />
                Y <br />
                N <br />
                A <br />
                M <br />
                I <br />
                C <br />
                F <br />
                I <br />
                T <br />
              </div>
            </div>

            <div className='Login-poster hidden lg:block'>
              <div>
                <img src={poster2} alt="poster" className='poster-placement h-[830px] w-[800px]' />
              </div>
            </div>

            <div className={`${dynamicStyle}`}>
              {showRegister ? "" :
                <marquee behavior="scroll" direction="left" className='moving-text'>
                  Stay fit, stay healthy, stay happy!
                </marquee>}
              <div onChange={(e) => { setEmailInput(e.target.value) }}>
                <InputContainer
                  type={"email"}
                  icon={email}
                  name={"email"}
                  placeholder={"Enter email"}
                />
              </div>
              <div onChange={(e) => { setPasswordInput(e.target.value) }}>
                <SecondInputContainer
                  type={"password"}
                  icon={padlock}
                  name={"password"}
                  placeholder={"Enter password"}
                />
              </div>

              {showRegister && (
                <div className='Register-components'>
                  <div onChange={(e) => { setUsernameInput(e.target.value) }}>
                    <SecondInputContainer name="username" icon={idcard} placeholder="Enter username" type="text" />
                  </div>
                  <div onChange={(e) => { setAgeInput(e.target.value) }}>
                    <SecondInputContainer name="age" icon={age} placeholder="Enter age" type="number" />
                  </div>
                </div>
              )}

              {!showRegister &&
                <div onClick={handleLogin}>
                  <LoginPageButton
                    message={buttonText}
                  />
                </div>}
              {showRegister &&
                <div onClick={handleRegister}>
                  <LoginPageButton
                    message={buttonText}
                  />
                </div>}

              <div className='Login-bottom ml-5 mr-10' onClick={handleSwitchClick}>
                {showRegister ? "Click to login" : "Create an account"}
              </div>
              <div className='Login-bottom ml-5 mr-10'>
                {showRegister ? '' : "Forgot password ?"}
              </div>

              <div>
                {!showRegister ?
                  <div className='Login-userAdmin-switch' onClick={() => setSwitchToggle(false)}>
                    <h3>User</h3>
                    <label className="Login-userAdmin-switch-switch">
                      <input type="checkbox" />
                      <span className="Login-userAdmin-switch-slider"></span>
                    </label>
                    <h3>Admin</h3>
                  </div>
                  : ''}
              </div>
              <div>
                {!showRegister ?
                  <div className='Login-userAdmin-switch' onClick={() => setTrainerToggle(true)}>
                    <h3>User</h3>
                    <label className="Login-userAdmin-switch-switch">
                      <input type="checkbox" />
                      <span className="Login-userAdmin-switch-slider"></span>
                    </label>
                    <h3>Trainer</h3>
                  </div>
                  : ''}
              </div>

            </div>
          </div>
        )
      }

    </div>
  );
}

export default LoginForm;

