import { useState } from "react";
import { useFireBaseContext } from "./context/FireBaseContext";
import uniqid from "uniqid";

const App = () => {
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
    <>
      <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
        <form
          className="flex flex-col border rounded-sm w-95 text-white p-3"
          onSubmit={(e) => userSignUp(e)}
        >
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-900 py-2 px-4 w-20 rounded-md cursor-pointer active:scale-95"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
