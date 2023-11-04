
import { initializeApp } from "firebase/app";
import { getAuth , onAuthStateChanged , createUserWithEmailAndPassword ,
     signInWithEmailAndPassword , signOut , sendEmailVerification , deleteUser } from "firebase/auth";

import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const observeAuthState = (onUserChanged) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        onUserChanged(user);
      } else {
        // No user is signed in.
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
  
  export { auth, observeAuthState , addNewUser , signInUser , signOut , sendEmailVerificationLink , deleteUserAccount };

export default auth