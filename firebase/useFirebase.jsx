import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEqAOGSsB_YYE0RhHUZrXOOr7YNFgeZVE",
  authDomain: "test-e618e.firebaseapp.com",
  databaseURL:
    "https://test-e618e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-e618e",
  storageBucket: "test-e618e.appspot.com",
  messagingSenderId: "328086729456",
  appId: "1:328086729456:web:395806a9619fa6f86d4835",
  measurementId: "G-KWW4Q52TTZ",
};
const firebase = () => {
  //init firebase app
  initializeApp(firebaseConfig);

  return {
    //auth
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    //store
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  };
};

export default firebase;

// //init services
// const db = getFirestore();
// const auth = getAuth();

// //collection ref
// const colRef = collection(db, "notes");

// //init notes array
// let notes = [];
// const formatAuthUser = (user) => ({
//   uid: user.uid,
//   email: user.email,
// });

// const userStatus = () => {
//   const [authUser, setAuthUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const authStateChanged = async (authState) => {
//     if (!authState) {
//       setAuthUser(null);
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     let formattedUser = formatAuthUser(authState);
//     setAuthUser(formattedUser);
//     setLoading(false);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       authStateChanged(user);
//     });
//     return () => unsubscribe();
//   }, []);
//   return {
//     authUser,
//     loading,
//   };
// };
// export {
//   //db
//   db,
//   colRef,
//   getDocs,
//   onSnapshot,
//   addDoc,
//   doc,
//   deleteDoc,
//   //auth
//   auth,
//   userStatus,
//   createUserWithEmailAndPassword,
//   signOut,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// };
