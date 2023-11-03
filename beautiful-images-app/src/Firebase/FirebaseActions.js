// src/firebase.js
import { initializeApp } from "firebase/app";
import {  getFirestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,getDoc, getDocs, where , query } from 'firebase/firestore/lite';

import firebaseConfig from './FirebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const addNewDocument = async (collectionName, docData) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), docData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

const removeDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  
  const updateDocument = async (collectionName, documentId, updatedData) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, updatedData);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const readDocument = async (collectionName, documentId) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        console.log("Document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return null;
    }
  };

  const queryDocuments = async (collectionName, field, operator, value) => {
    try {
      const q = query(collection(db, collectionName, where(field, operator, value)));
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => doc.data());
      return documents;
    } catch (error) {
      console.error("Error querying documents: ", error);
      return [];
    }
  };

  const batchWrite = async (operations) => {
    try {
      for (const operation of operations) {
        const { type, collectionName, docId, data } = operation;
  
        if (type === "set") {
          await addNewDocument(collectionName, data);
        } else if (type === "update") {
          await updateDocument(collectionName, docId, data);
        } else if (type === "delete") {
          await removeDocument(collectionName, docId);
        }
      }
  
      console.log("Batch write completed successfully");
    } catch (error) {
      console.error("Error performing batch write: ", error);
    }
  };
  
  
  export { db, addNewDocument, removeDocument, updateDocument, readDocument, queryDocuments , batchWrite };

export default db
