import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, query, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, where } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ?? null);
      setLoading(false);
    });
    return unsubscribe;
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

  const signOutUser = async () => {
    // sign out via Firebase and allow onAuthStateChanged to update state
    return await signOut(firebaseAuth);
  }

  const handleCreateNewListing = async (name, isbn, price, file) => {
    //saving image in storage 
    const imageRef = storageRef(storage, `uploads/images/${Date.now()}-${file.name}`)
    const uploadResult = await uploadBytes(imageRef, file);

    //save book data into firestore
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

  const listAllBooks = async () => {
    return await getDocs(collection(firestore, "books"));
  }

  const getImageURL = (path) => {
    return getDownloadURL(storageRef(storage, path));
  }

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  }

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      userPicURL: user.photoURL,
      qty: qty
    });
    return result;
  }

  const fetchMyBooks = async () => {
    if (!user) return null;
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const result = await getDocs(q);
    return result
  }

  return (
    <FirebaseContext.Provider
      value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword, putData, signInWithGoogle, isLoggedIn, user, loading, signOut: signOutUser, handleCreateNewListing, listAllBooks, getImageURL, getBookById, placeOrder, fetchMyBooks }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FireBaseContext;
