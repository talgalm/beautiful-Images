import './App.css';
import { addNewDocument , removeDocument , updateDocument , readDocument , queryDocuments , batchWrite } from './Firebase/FirebaseActions'; // Import db and addNewDocument
import { auth , observeAuthState  , addNewUser , signInUser , signOut , sendEmailVerificationLink , deleteUserAccount ,
  signInWithGoogle  } from './Firebase/FirebaseAuth'; 
import { useEffect, useState } from 'react';
import { translations } from './environments/languages';
import { useLanguage } from './environments/LanguageContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom';

import Admin from './Components/Admin';
import Enter from './Components/Enter';

const App = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };
  const [isSignUpActive, setSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setSignUpActive(true);
  };

  const handleSignInClick = () => {
    setSignUpActive(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <nav className="TopLayerHeader">
            <div class="select">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="he">עברית</option>
              </select>
            </div>
            <ul>
              <li>
                <Link to="/admin">{translations.Admin[currentLanguage]}</Link>
              </li>
              <li>
                <Link to="/enter">About</Link>
              </li>
            </ul>
          </nav>
        </header>

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
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                  <a href="#" className="social">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
                <span>{translations.EmailRegistration[currentLanguage]}</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>{translations.SignUp[currentLanguage]}</button>
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
                      <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="#" className="social">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </div>
                <span>{translations.UseYourAccount[currentLanguage]}</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">{translations.ForgetPassword[currentLanguage]}</a>
                <button>{translations.SignIn[currentLanguage]}</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>{translations.WelcomeBack[currentLanguage]}</h1>
                  <p>{translations.LoginPersonalInfo[currentLanguage]}</p>
                  <button className="ghost" id="signIn" onClick={handleSignInClick}>
                  {translations.SignIn[currentLanguage]}
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1> {translations.HelloFriend[currentLanguage]}</h1>
                  <p>{translations.PersonalDetails[currentLanguage]}</p>
                  <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                  {translations.SignUp[currentLanguage]}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="admin/" element={<Admin />} />
            <Route path="/enter" element={<Enter />} />
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