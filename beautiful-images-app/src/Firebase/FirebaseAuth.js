
import { initializeApp } from "firebase/app";
import { getAuth , onAuthStateChanged , createUserWithEmailAndPassword ,
     signInWithEmailAndPassword , signOut , sendEmailVerification , deleteUser,
     getRedirectResult, GoogleAuthProvider , signInWithRedirect , signInWithPopup } from "firebase/auth";



import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const observeAuthState = (onUserChanged) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onUserChanged(user);
      } else {
        onUserChanged(null);
      }
    });
  }; 
  
const addNewUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user: ", error.message);
    }
  };
  
  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  const sendEmailVerificationLink = (user) => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Email verification link sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending email verification link: ", error.message);
      });
  };

  const deleteUserAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      console.log("User account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account: ", error.message);
    }
  };


  const provider = new GoogleAuthProvider();


  const signInWithGoogle = async () => {
//     signInWithRedirect(auth, provider);
//     getRedirectResult(auth)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access Google APIs.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  } 


  
  export { auth, observeAuthState , addNewUser , signInUser , signOut , sendEmailVerificationLink , deleteUserAccount ,
    signInWithGoogle };

export default auth