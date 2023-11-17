import './App.css';
import { addNewDocument , removeDocument , updateDocument , readDocument , queryDocuments , batchWrite } from './Firebase/FirebaseActions'; // Import db and addNewDocument
import { auth , observeAuthState  , addNewUser , signInUser , signOut , sendEmailVerificationLink , deleteUserAccount ,
  signInWithGoogle  } from './Firebase/FirebaseAuth'; 
import { useEffect, useState } from 'react';
import { diraction, translations } from './environments/languages';
import { useLanguage } from './environments/LanguageContext';
import { BrowserRouter as Router, Route, Routes , useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { sendPasswordReset } from './Firebase/FirebaseAuth';


import { Link } from 'react-router-dom';

import SignPage from './Components/SignPage';
import Enter from './Components/Enter';
import Admin from './Components/Admin';
import ImageUpload from './Components/ImageUpload';


const App = () => {
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
    setForgetPassword(false);
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

  const [WelcomePage, setWelcomePage] = useState(true);

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
                  {user ? (
                    <Link onClick={handleSignOut}>Sign Out</Link>
                  ) : (
                    <h></h>
                  )}
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

        </div>
        )}

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

// function App() {


//   const handleAddNewDocument = async () => {
//     const docData = {
//       name: "John Doe",
//       age: 30,
//     };
//     addNewDocument("your_collection_name", docData);
//   };

//   const handleRemoveDocument = async (documentId) => {
//     removeDocument("your_collection_name", documentId);
//   };

//   const handleUpdateDocument = async (documentId, updatedData) => {
//     updateDocument("your_collection_name", documentId, updatedData);
//   };

//   const handleReadDocument = async (documentId) => {
//     const documentData = await readDocument("your_collection_name", documentId);
//     if (documentData) {
//       console.log("Read Document:", documentData);
//     }
//   };

//   const handleQueryDocuments = async () => {
//     const documents = await queryDocuments("your_collection_name", "age", ">=", 25);
//     if (documents.length > 0) {
//       console.log("Query Result:", documents);
//     } else {
//       console.log("No documents found that match the query criteria.");
//     }
//   };
//   const handleBatchWrite = async () => {
//     const operations = [
//       { type: "set", collectionName: "your_collection_name", docId: "documentId1", data: { name: "Document 1" } },
//       { type: "update", collectionName: "your_collection_name", docId: "documentId2", data: { name: "Updated Document 2" } },
//       { type: "delete", collectionName: "your_collection_name", docId: "documentId3" },
//     ];

//     batchWrite(operations);
//   };

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Start observing the authentication state.
//     observeAuthState((currentUser) => {
//       setUser(currentUser);
//     });
//   }, []);

//   const handleSignOut = async () => {
//     // Sign out the currently authenticated user.
//     await signOut(auth);
//   };

//   const handleAddNewUser = async () => {
//     try {
//       // Replace 'email' and 'password' with user input or other sources.
//       const email = 'user@example.com';
//       const password = 'password123';

//       await addNewUser(email, password);
//     } catch (error) {
//       console.error("Error adding a new user: ", error);
//     }
//   };

//   const handleSignIn = async () => {
//     try {
//       // Replace 'email' and 'password' with user input or other sources.
//       const email = 'user@example.com';
//       const password = 'password123';

//       await signInUser(email, password);
//     } catch (error) {
//       console.error("Error signing in: ", error);
//     }
//   };

//   const handleSendVerificationEmail = () => {
//     sendEmailVerificationLink(auth.currentUser);
//   };

//   const handleDeleteAccount = () => {
//     deleteUserAccount();
//   };

//   const handleSignInGoogle = async () => {
//     try {
//       await signInWithGoogle();
//     } catch (error) {
//       console.error("Error signing in: ", error);
//     }
//   };

//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <p>Here is the DB functions of Firebase</p>
//   //       <button onClick={handleAddNewDocument}>Add New Document</button>
//   //       <button onClick={() => handleRemoveDocument("documentIdToDelete")}>Remove Document</button>
//   //       <button onClick={() => handleReadDocument("documentIdToRead")}>Read Document</button>
//   //       <button onClick={handleQueryDocuments}>Query Documents</button>
//   //       <button onClick={() => handleUpdateDocument("documentIdToUpdate", { name: "Updated Name" })}>Update Document</button>
//   //       <button onClick={handleBatchWrite}>Batch Write</button>
//   //       <p>Here is the Auth functions of Firebase</p>
//   //       <p>Welcome, {user ? user.email : 'Guest'}!</p>
//   //       {user ? (
//   //         <button onClick={handleSignOut}>Sign Out</button>
//   //       ) : (
//   //         <p>Please sign in to continue.</p>
//   //       )}
//   //       {auth.currentUser && !auth.currentUser.emailVerified && (
//   //         <>
//   //           <p>Please verify your email address.</p>
//   //           <button onClick={handleSendVerificationEmail}>Send Verification Email</button>
//   //         </>
//   //       )}
        
//   //       <button onClick={handleAddNewUser}>Add New User</button>
//   //       <button onClick={handleSignIn}>Sign In</button>
//   //       <button onClick={handleDeleteAccount}>Delete Account</button>

//   //       <p>Google !</p>
//   //       <button onClick={handleSignInGoogle}>Press to sign</button>
//   //       <div>
//   //         <p>Here is languge change</p>
//   //         <button onClick={() => handleLanguageChange('en')}>English</button>
//   //         <button onClick={() => handleLanguageChange('he')}>עברית</button>
//   //         {/* Add buttons for other languages as needed */}
//   //       </div>
//   //       <h1>{translations.welcome[currentLanguage]}</h1>
//   //       <p>{translations.greeting[currentLanguage]}</p>
//   //     </header>
//   //   </div>
    
//   // );
//     return (
//     <div className="App">
//       <header className="App-header">
//       </header>
//     </div>);
// }

// export default App;