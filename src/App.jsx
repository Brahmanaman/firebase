import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";
import List from "./pages/List";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import BookDetails from "./pages/BookDetails"

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<BookDetails />} />
      </Routes>
    </>
  );
};

export default App;
