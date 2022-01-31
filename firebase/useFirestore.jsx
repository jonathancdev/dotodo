import firebase from "./useFirebase";
import { useState, useEffect } from "react";
const {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} = firebase();

const useFirestore = () => {
  const db = getFirestore();
  console.log(db);
  return {
    db,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
  };
};
export default useFirestore;
