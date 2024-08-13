"use client";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../../lib/firebase";

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const googleSignUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      //   const userEmail = observer?.email || user?.email;
      //   const loggedUser = { email: userEmail };
      //   if (observer) {
      //     axiosPublic.post("/jwt", loggedUser).then((res) => {
      //       if (res.data.token) {
      //         localStorage.setItem("access-token", res.data.token);
      //         setLoading(false);
      //       } else {
      //         localStorage.removeItem("access-token");
      //         setLoading(false);
      //       }
      //     });
      //   }
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    user,
    signIn,
    logOut,
    loading,
    googleSignUp,
    updateProfile: (user, profile) => updateProfile(user, profile),
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
