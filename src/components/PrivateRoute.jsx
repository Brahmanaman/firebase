import { Navigate, Outlet } from "react-router";
import { useFireBaseContext } from "../context/FireBaseContext";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useFireBaseContext();

    if (loading) return <div>Loading...</div>;

    return isLoggedIn ? (<Outlet />) : <Navigate to="/login" replace />;
};

export default PrivateRoute;