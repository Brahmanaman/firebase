import { useEffect, useState } from "react";
import { useFireBaseContext } from "../context/FireBaseContext";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const fireBaseContext = useFireBaseContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(fireBaseContext.isLoggedIn){
      navigate("/");
    }
  },[fireBaseContext.isLoggedIn])

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

 
  const googleSignIn = async () => {
    const data = await fireBaseContext.signInWithGoogle();
  };

  const userSignIn = async (e) =>{
    e.preventDefault();
    const data = await fireBaseContext.signInUserWithEmailAndPassword(userData.email, userData.password);
    console.log(data);
  }




  return (
    <>
       <div className=" h-screen w-full flex items-center justify-center">
      <form className="flex flex-col border rounded-sm w-95 text-white p-3">
        <h1 className="text-center text-2xl">FireBase</h1>
        <div className="justify-center">
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
          <div className="flex justify-center gap-2 mt-5">
            <button
              onClick={(e) => userSignIn(e)}
              type="button"
              className="bg-blue-900 hover:bg-blue-950 transition-colors py-2 px-4 w-auto rounded-md cursor-pointer active:scale-95"
            >
              SignIn
            </button>
            <button
              type="button"
              className="bg-red-900 hover:bg-red-950 transition-colors py-2 px-4 w-auto rounded-md cursor-pointer active:scale-95"
              onClick={googleSignIn}
            >
              SignIn with Google
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignIn;
