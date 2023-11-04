import './App.css';
import { addNewDocument , removeDocument , updateDocument , readDocument , queryDocuments , batchWrite } from './Firebase/FirebaseActions'; // Import db and addNewDocument
import { auth , observeAuthState  , addNewUser , signInUser , signOut } from './Firebase/FirebaseAuth'; 
import { useEffect, useState } from 'react';


function App() {

  const handleAddNewDocument = async () => {
    const docData = {
      name: "John Doe",
      age: 30,
    };
    addNewDocument("your_collection_name", docData);
  };

  const handleRemoveDocument = async (documentId) => {
    removeDocument("your_collection_name", documentId);
  };

  const handleUpdateDocument = async (documentId, updatedData) => {
    updateDocument("your_collection_name", documentId, updatedData);
  };

  const handleReadDocument = async (documentId) => {
    const documentData = await readDocument("your_collection_name", documentId);
    if (documentData) {
      console.log("Read Document:", documentData);
    }
  };

  const handleQueryDocuments = async () => {
    const documents = await queryDocuments("your_collection_name", "age", ">=", 25);
    if (documents.length > 0) {
      console.log("Query Result:", documents);
    } else {
      console.log("No documents found that match the query criteria.");
    }
  };
  const handleBatchWrite = async () => {
    const operations = [
      { type: "set", collectionName: "your_collection_name", docId: "documentId1", data: { name: "Document 1" } },
      { type: "update", collectionName: "your_collection_name", docId: "documentId2", data: { name: "Updated Document 2" } },
      { type: "delete", collectionName: "your_collection_name", docId: "documentId3" },
    ];

    batchWrite(operations);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Start observing the authentication state.
    observeAuthState((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignOut = async () => {
    // Sign out the currently authenticated user.
    await signOut(auth);
  };

  const handleAddNewUser = async () => {
    try {
      // Replace 'email' and 'password' with user input or other sources.
      const email = 'user@example.com';
      const password = 'password123';

      await addNewUser(email, password);
    } catch (error) {
      console.error("Error adding a new user: ", error);
    }
  };

  const handleSignIn = async () => {
    try {
      // Replace 'email' and 'password' with user input or other sources.
      const email = 'user@example.com';
      const password = 'password123';

      await signInUser(email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Here is the DB functions of Firebase</p>
        <button onClick={handleAddNewDocument}>Add New Document</button>
        <button onClick={() => handleRemoveDocument("documentIdToDelete")}>Remove Document</button>
        <button onClick={() => handleReadDocument("documentIdToRead")}>Read Document</button>
        <button onClick={handleQueryDocuments}>Query Documents</button>
        <button onClick={() => handleUpdateDocument("documentIdToUpdate", { name: "Updated Name" })}>Update Document</button>
        <button onClick={handleBatchWrite}>Batch Write</button>
        <p>Here is the Auth functions of Firebase</p>
        <p>Welcome, {user ? user.email : 'Guest'}!</p>
        {user ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <p>Please sign in to continue.</p>
        )}
        <button onClick={handleAddNewUser}>Add New User</button>
        <button onClick={handleSignIn}>Sign In</button>
      </header>
    </div>
  );
}

export default App;