import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "../firebase/useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  auth: {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
  signInWithEmailAndPassword: async () => {},
  clear: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
