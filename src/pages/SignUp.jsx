import uniqid from "uniqid";
import { useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext";

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

  const googleSignIn = async () => {
    const data = await fireBaseContext.signInWithGoogle();
    console.log(data);
  };

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <form className="flex flex-col border rounded-sm w-95 text-white p-3">
        <h1 className="text-center text-2xl">FireBase</h1>
        <div className="justify-center">
          <div className="flex flex-col ">
            <label htmlFor="username">UserName</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-0"
              required
              type="text"
              name="username"
              placeholder="enter your username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="email"
              name="email"
              placeholder="enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              className="border rounded-sm py-1 px-2 bg-transparent m-2 ml-0 outline-none"
              required
              type="password"
              name="password"
              placeholder="enter your password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="bg-red-900 hover:bg-red-950 transition-colors py-2 px-4 w-auto rounded-md cursor-pointer active:scale-95"
              onClick={googleSignIn}
            >
              SignIn with Google
            </button>
            <button
              onClick={(e) => userSignUp(e)}
              type="submit"
              className="bg-blue-900 hover:bg-blue-950 transition-colors py-2 px-4 w-auto rounded-md cursor-pointer active:scale-95"
            >
              SignUp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
