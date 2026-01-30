import React from "react";
import { useFireBaseContext } from "../context/FireBaseContext";
import { Link, useNavigate } from "react-router";



const Navbar = () => {
  const { isLoggedIn, loading, signOut } = useFireBaseContext();
  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;

  return (
    <nav className="flex items-center justify-between bg-slate-950 px-6 py-3 text-slate-200 border-b border-slate-800 shadow-sm">
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-6 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/book/list" className="hover:text-white transition-colors">Add Listing</Link>
              <Link to="/book/orders" className="hover:text-white transition-colors">View Orders</Link>
            </ul>
          </div>

          <button
            type="button"
            className="rounded-md bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-500 active:scale-95"
            onClick={async () => {
              try { await signOut(); navigate('/login'); }
              catch (e) { console.error(e); }
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <div className="flex items-center gap-6 font-medium ml-auto">
          <Link to="/login" className="hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="rounded-md bg-slate-100 px-4 py-2 text-slate-950 hover:bg-white transition">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
