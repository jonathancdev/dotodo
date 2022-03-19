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
  getDoc,
  query,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  signInAnonymously,
} from "firebase/auth";

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
    signInAnonymously,
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
    getDoc,
    query,
  };
};

export default firebase;
