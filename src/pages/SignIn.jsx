import { signOut } from "firebase/auth";
import { firebaseAuth } from "../context/FireBaseContext";
import Navbar from "../components/Navbar";

const SignIn = ({ user }) => {
  return (
    <>
      <Navbar />
      <div className="px-5 py-2">
        <div className="flex flex-col items-center justify-center text-white font-semibold text-2xl">
          <p>Hello {user.displayName}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
