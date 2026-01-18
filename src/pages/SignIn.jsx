import { signOut } from "firebase/auth";
import { firebaseAuth } from "../context/FireBaseContext";

const SignIn = ({ user }) => {
  return (
    <div className="px-5 py-2">
      <div className="flex justify-end">
        <button
          className="text-white bg-green-900 py-2 px-4 rounded-md cursor-pointer font-semibold"
          onClick={() => signOut(firebaseAuth)}
        >
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-center text-white font-semibold text-2xl">
        <p>Hello {user.displayName}</p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default SignIn;
