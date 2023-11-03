import './App.css';
import { addNewDocument , removeDocument , updateDocument , readDocument , queryDocuments , batchWrite } from './Firebase/FirebaseActions'; // Import db and addNewDocument

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

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome!</p>
        <button onClick={handleAddNewDocument}>Add New Document</button>
        <button onClick={() => handleRemoveDocument("documentIdToDelete")}>Remove Document</button>
        <button onClick={() => handleReadDocument("documentIdToRead")}>Read Document</button>
        <button onClick={handleQueryDocuments}>Query Documents</button>
        <button onClick={() => handleUpdateDocument("documentIdToUpdate", { name: "Updated Name" })}>Update Document</button>
        <button onClick={handleBatchWrite}>Batch Write</button>
      </header>
    </div>
  );
}

export default App;