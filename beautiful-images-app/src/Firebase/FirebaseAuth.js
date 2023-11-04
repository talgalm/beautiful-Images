
import { initializeApp } from "firebase/app";
import { getAuth , onAuthStateChanged , createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut} from "firebase/auth";

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
  
  export { auth, observeAuthState , addNewUser , signInUser , signOut};

export default auth