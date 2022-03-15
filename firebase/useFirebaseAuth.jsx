import firebase from "./useFirebase";
import { useState, useEffect } from "react";
const {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  deleteUser,
  signInAnonymously,
} = firebase();
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});
const useFirebaseAuth = () => {
  const auth = getAuth();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    let formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authStateChanged(user);
      //console.log("AUTHSTATE CHANGED ", user);
    });
    return () => unsubscribe();
  }, []);
  return {
    authUser,
    loading,
    auth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    deleteUser,
    clear,
    signInAnonymously,
  };
};
export default useFirebaseAuth;
