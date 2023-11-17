import './App.css';
import { auth , observeAuthState ,signOut  } from './Firebase/FirebaseAuth'; 
import { useEffect, useState } from 'react';
import { translations } from './environments/languages';
import { useLanguage } from './environments/LanguageContext';
import { BrowserRouter as Router, Route, Routes , useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

import SignPage from './Components/SignPage';
import Enter from './Components/Enter';
import ImageUpload from './Components/ImageUpload';


const App = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [user, setUser] = useState(null);
  const [WelcomePage, setWelcomePage] = useState(true);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  useEffect(() => {
    observeAuthState((currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const handleSignOut = async () => {
    await signOut(auth);
  };
  const handleSignPage = async () => {
    setWelcomePage(false);
  };
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="TopLayerHeader">
          <img src="/logo-no-background.svg" alt="SVG Image" style={{ width: '320px', height: '240px'  , padding:'40px'}} />
            <ul>
              <li>
                <Link to="/imageUpload" onClick={handleSignPage}> upload </Link>
              </li>
              <li>
                <Link >{translations.Admin[currentLanguage]}</Link>
              </li>
              <li>
                <Link to="/enter">{translations.About[currentLanguage]}</Link>
              </li>
              <li>
                <Link>{translations.WelcomeLogin[currentLanguage]} {user ? user.email : translations.Guest[currentLanguage]}</Link>
              </li>
              <li>
                  {user ? (<Link onClick={handleSignOut}>Sign Out</Link>) : (<h></h>)}
              </li>
              <div class="select">
                <select value={currentLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
                  <option value="en">English</option>
                  <option value="he">עברית</option>
                </select>
              </div>
            </ul>
          </nav>
        </header>


        <div className="ContentBelowHeader">
        {WelcomePage && (
        <div >
          <img src="/screen.png" alt="SVG Image" style={{ width: '700px', height: '495px' , top: '25%' , position:'fixed', right: '200px',  }} />
          <h1 className="homepage-heading" style={{fontSize: '85px' , marginTop:'150px'}}>{translations.Welcome1[currentLanguage]}</h1>
          <h1 className="homepage-heading" style={{fontSize: '60px'  , marginTop:'-40px'}}>{translations.Welcome2[currentLanguage]}</h1>
          <Link to="/sign_page" class="button-53" role="button" onClick={handleSignPage} style={{	marginLeft: '315px'}}>Get Started</Link>
        </div>)}
          <Routes>
            <Route path="sign_page/" element={<SignPage />} />
            <Route path="/enter" element={<Enter />} />
            <Route path="/imageUpload" element={<ImageUpload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;