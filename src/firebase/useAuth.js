"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addUser,
  checkAdmin,
  getCurrentUser,
} from "@/redux/features/userSlice/userSlice";
import app from "./firebase.config";

const auth = getAuth(app);

const useAuth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // Function to create a user
  const createUser = async (name, email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Update Firebase user profile
      await updateProfile(newUser, { displayName: name });

      // Send user data to backend
      const userData = {
        name,
        email,
        role,
        uid: newUser.uid, // Firebase UID
      };

      // Send user to backend & Redux
      dispatch(addUser(userData));
      //await dispatch(getCurrentUser({ email })); // Fetch user details from backend
      dispatch(checkAdmin(email)); // Check if user is admin

      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      

      return userCredential.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      dispatch(getCurrentUser(currentUser )); // Fetch user details from backend
    });

    return () => unsubscribe();
  }, []);

  return { user, createUser, signIn, logOut };
};

export default useAuth;
