import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAND3w_AkzhlPYKMWrF8nAbM64u_DcTJ2A",
  authDomain: "bookify-firebase-6ad47.firebaseapp.com",
  projectId: "bookify-firebase-6ad47",
  storageBucket: "bookify-firebase-6ad47.firebasestorage.app",
  messagingSenderId: "140840174182",
  appId: "1:140840174182:web:56fba88bb05774a387a3a7",
  measurementId: "G-SMYB1EVRXF",
  databaseURL: "https://fir-64a8a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const FirebaseContext = createContext(null);
const provider = new GoogleAuthProvider();

export const useFireBaseContext = () => {
  return useContext(FirebaseContext);
};

const FireBaseContext = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const signInUserWithEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const putData = (key, data) => {
    set(ref(db, "users/" + key), data);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, provider);
  };

  const isLoggedIn = user ? true : false;
  console.log(user)
  const handleCreateNewListing = async (name, isbn, price, file) => {
    const imageRef = storageRef(storage, `uploads/images/${Date.now()}-${file}`)
    const uploadResult = await uploadBytes(imageRef, file);
    return await addDoc(collection(firestore, 'books'), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      userPicURL: user.photoURL
    })

  }

  return (
    <FirebaseContext.Provider
      value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword, putData, signInWithGoogle, isLoggedIn, handleCreateNewListing }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FireBaseContext;
