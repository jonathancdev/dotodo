import firebase from "./useFirebase";

const {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} = firebase();

const useFirestore = () => {
  const db = getFirestore();

  return {
    db,
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
export default useFirestore;
