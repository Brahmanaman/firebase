import { signOut } from "firebase/auth";
import React from "react";
import { firebaseAuth } from "../context/FireBaseContext";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="text-white flex items-center justify-between bg-blue-950 px-5 py-2">
      <div className="flex items-center gap-5">
        <ul className="flex items-center cursor-pointer gap-5">
          <Link to="/">Home</Link>
          <Link to="/book/list">Add Listing</Link>  
        </ul>
      </div>
      <button
        type="button"
        className="text-white bg-green-900 py-2 px-4 rounded-md cursor-pointer font-semibold hover:bg-green-800 transition"
        onClick={() => signOut(firebaseAuth)}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
