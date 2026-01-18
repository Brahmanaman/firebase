import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVHrfHxeKdkDqh9cz_aHIkfOqvfIPd_FY",
  authDomain: "fir-64a8a.firebaseapp.com",
  databaseURL: "https://fir-64a8a-default-rtdb.firebaseio.com",
  projectId: "fir-64a8a",
  storageBucket: "fir-64a8a.firebasestorage.app",
  messagingSenderId: "331393900351",
  appId: "1:331393900351:web:1a57ad5711f1031a493d8a",
  measurementId: "G-C4RVFTLTFP",
  databaseURL: "https://fir-64a8a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getDatabase(app);

const FirebaseContext = createContext(null);

export const useFireBaseContext = () => {
  return useContext(FirebaseContext);
};

const FireBaseContext = ({ children }) => {
  const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => {
    set(ref(db, "users/" + key), data);
  };

  return (
    <FirebaseContext.Provider
      value={{ signUpUserWithEmailAndPassword, putData }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FireBaseContext;
