import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";
import List from "./pages/List";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import BookDetails from "./pages/BookDetails"
import ViewOrder from "./pages/ViewOrder";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* Protected */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/book/list" element={<List />} />
          <Route path="/book/view/:bookId" element={<BookDetails />} />
          <Route path="/book/orders" element={<ViewOrder />} />
          <Route path="/book/orders/:bookId" element={<></>} />
        </Route>
      </Routes >
    </>
  );
};

export default App;
