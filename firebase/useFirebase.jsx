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
  setDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";

//original
// const firebaseConfig = {
//   apiKey: "AIzaSyBEqAOGSsB_YYE0RhHUZrXOOr7YNFgeZVE",
//   authDomain: "test-e618e.firebaseapp.com",
//   databaseURL:
//     "https://test-e618e-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "test-e618e",
//   storageBucket: "test-e618e.appspot.com",
//   messagingSenderId: "328086729456",
//   appId: "1:328086729456:web:395806a9619fa6f86d4835",
//   measurementId: "G-KWW4Q52TTZ",
// };
//new
const firebaseConfig = {
  apiKey: "AIzaSyB61c0_8lnboDXV5gwITfU4pM_Zo1rCOVo",
  authDomain: "dotodo-eec72.firebaseapp.com",
  projectId: "dotodo-eec72",
  storageBucket: "dotodo-eec72.appspot.com",
  messagingSenderId: "472205582271",
  appId: "1:472205582271:web:37583e2914de3b1aae0b0a",
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
    deleteUser,
    //store
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    setDoc,
  };
};

export default firebase;
