import React from 'react';
import '../App.css';
import { addNewDocument , removeDocument , updateDocument , readDocument , queryDocuments , batchWrite } from '../Firebase/FirebaseActions'; // Import db and addNewDocument
import { auth , observeAuthState  , addNewUser , signInUser , signOut , sendEmailVerificationLink , deleteUserAccount ,
  signInWithGoogle  } from '../Firebase/FirebaseAuth';
import { useEffect, useState } from 'react';
import { diraction, translations } from '../environments/languages';
import { useLanguage } from '../environments/LanguageContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { sendPasswordReset } from '../Firebase/FirebaseAuth';

import { Link } from 'react-router-dom';

import Enter from './Enter';

const SignPage = () => {

  const handleSendPasswordResetEmail = async () => {
    try {
      await sendPasswordReset(email);
      console.log('Password reset email sent successfully.');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setErrorMsg(error.message);
    }
  };

  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };
  const [isSignUpActive, setSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setSignUpActive(true);
    setEmail('');
    setPassword('');
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
    setEmail('');
    setPassword('');
    setForgetPassword(true);
  };

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [forgetPassword, setForgetPassword] = useState(true);

  const handleForgetPassword = () => {
    setForgetPassword(false);
  };

  useEffect(() => {
    observeAuthState((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleEmailChange = (event) => {
    setErrorMsg('')
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setErrorMsg('')
    setPassword(event.target.value);
  };

  const handleAddNewUser = async () => {
    try {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
      {
        setErrorMsg('Invalid email format');
      }
      else 
      {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password))
        {
          setErrorMsg('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        }
        else
        {
          await addNewUser(email, password);
          setEmail('');
          setPassword('');
          setErrorMsg('');
        }
      }
    } catch (error) {
      console.error("Error adding a new user: ", error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const email = 'user@example.com';
      const password = 'password123';

      await signInUser(email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };


  return (

    <div className="ContentBelowHeader">
    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>{translations.CreateAccount[currentLanguage]}</h1>
          <div className="social-container">
            <a href="#" className="social">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faGoogle} onClick={handleSignInGoogle} />
            </a>
            <a href="#" className="social">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <span style={{fontSize:'13px'}}>{translations.EmailRegistration[currentLanguage]}</span>
          <input type="email" placeholder={translations.Email[currentLanguage]} value={email} onChange={handleEmailChange} dir={diraction.dir[currentLanguage]}/>
          <input type="password" placeholder={translations.Password[currentLanguage]} value={password} onChange={handlePasswordChange} dir={diraction.dir[currentLanguage]} />
          <button class="button-53" onClick={handleAddNewUser}>{translations.SignUp[currentLanguage]}</button>
          <span  style={{ color: 'red', fontSize:'12px'}}>{errorMsg}</span>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>{translations.SignIn[currentLanguage]}</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faGoogle} onClick={handleSignInGoogle} />
              </a>
              <a href="#" className="social">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <span style={{fontSize:'13px'}}>{translations.UseYourAccount[currentLanguage]}</span>
          <input type="email" placeholder={translations.Email[currentLanguage]} value={email} onChange={handleEmailChange} dir={diraction.dir[currentLanguage]}/>
          {forgetPassword ? (<> <input type="password" placeholder={translations.Password[currentLanguage]} value={password} onChange={handlePasswordChange} dir={diraction.dir[currentLanguage]}/>
          <a href="#" onClick={handleForgetPassword}>{translations.ForgetPassword[currentLanguage]}</a>
          <button class="button-53" onClick={handleSignIn}>{translations.SignIn[currentLanguage]}</button> </> )
          :(<button class="button-53" onClick={handleSendPasswordResetEmail}>{translations.SendVerification[currentLanguage]}</button>)}
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>{translations.WelcomeBack[currentLanguage]}</h1>
            <p>{translations.LoginPersonalInfo[currentLanguage]}</p>
            <button class="button-53"  id="signIn" onClick={handleSignInClick}>
            {translations.SignIn[currentLanguage]}
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1> {translations.HelloFriend[currentLanguage]}</h1>
            <p>{translations.PersonalDetails[currentLanguage]}</p>
            <button class="button-53" id="signUp" onClick={handleSignUpClick}>
            {translations.SignUp[currentLanguage]}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Routes>
      <Route path="admin/" element={<SignPage />} />
      <Route path="/enter" element={<Enter />} />
    </Routes>
  </div>
  );
}

export default SignPage;
