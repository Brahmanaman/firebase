import uniqid from "uniqid";
import { useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext";
import { Link } from "react-router";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const fireBaseContext = useFireBaseContext();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const userSignUp = async (e) => {
    e.preventDefault();
    await fireBaseContext.signUpUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    fireBaseContext.putData(uniqid(), userData);
  };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 px-4">
      <form className="flex flex-col border border-slate-800 bg-slate-900/50 backdrop-blur-md rounded-2xl w-full max-w-md text-slate-200 p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-center text-slate-400 text-sm mt-2">Join us to get started</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-medium text-slate-300 ml-1">Username</label>
            <input
              className="border border-slate-700 rounded-xl py-2.5 px-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              type="text"
              name="username"
              placeholder="johndoe123"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <input
              className="border border-slate-700 rounded-xl py-2.5 px-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              type="email"
              name="email"
              placeholder="name@company.com"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" theological className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <input
              className="border border-slate-700 rounded-xl py-2.5 px-4 bg-slate-950/50 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <button
              onClick={(e) => userSignUp(e)}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              Create Account
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
