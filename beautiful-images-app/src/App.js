import logo from './logo.svg';
import './App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , addDoc} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOex1FMaXJyD-bq3eaurCbCWaw_PRyCiQ",
  authDomain: "beautiful-images-5ce69.firebaseapp.com",
  databaseURL: "https://beautiful-images-5ce69-default-rtdb.firebaseio.com",
  projectId: "beautiful-images-5ce69",
  storageBucket: "beautiful-images-5ce69.appspot.com",
  messagingSenderId: "266270374339",
  appId: "1:266270374339:web:6f66d76ea2b59408536576",
  measurementId: "G-Z3RQ3L8PVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function App() {
  const addNewDocument = async () => {
    try {
      const docData = {
        name: "John Doe",
        age: 30,
      };

      const docRef = await addDoc(collection(db, "your_collection_name"), docData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <button onClick={addNewDocument}>Add New Document</button>
      </header>
    </div>
  );
}


export default App;
