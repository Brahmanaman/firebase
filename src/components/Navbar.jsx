import React from "react";
import { useFireBaseContext } from "../context/FireBaseContext";
import { Link, useNavigate } from "react-router";



const Navbar = () => {
  const { isLoggedIn, loading, signOut } = useFireBaseContext();
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="text-white flex items-center justify-between bg-blue-950 px-5 py-2">
      {isLoggedIn ? (
        <>

          <div className="flex items-center gap-5">
            <ul className="flex items-center cursor-pointer gap-5">
              <Link to="/">Home</Link>
              <Link to="/book/list">Add Listing</Link>
              <Link to="/book/orders">View Orders</Link>
            </ul>
          </div>
          <button
            type="button"
            className="text-white bg-green-900 py-2 px-4 rounded-md cursor-pointer font-semibold hover:bg-green-800 transition"
            onClick={async () => { try { await signOut(); navigate('/login'); } catch (e) { console.error(e); } }}
          >
            Sign Out
          </button>
        </>
      )
        :
        (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )
      }
    </div>
  );
};

export default Navbar;
