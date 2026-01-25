import React from "react";

const Navbar = () => {
  return (
    <div className="text-white flex items-center justify-between bg-blue-950 px-5 py-2">
      <div className="flex items-center gap-5">
        <ul className="flex items-center cursor-pointer gap-5">
          <li className="">Home</li>
          <li className="">Add Listing</li>
        </ul>
      </div>
      <button
        className="text-white bg-green-900 py-2 px-4 rounded-md cursor-pointer font-semibold"
        onClick={() => signOut(firebaseAuth)}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
