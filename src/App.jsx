import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { firebaseAuth } from "./context/FireBaseContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
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
  return (
    <>
      <div className="w-screen h-screen bg-gray-900">
        {user ? <SignIn user={user} /> : <SignUp />}
      </div>
    </>
  );
};

export default App;
