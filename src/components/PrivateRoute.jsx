import { Navigate, Outlet } from "react-router";
import { useFireBaseContext } from "../context/FireBaseContext";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useFireBaseContext();

    if (loading) return <div>Loading...</div>; // or a spinner

    // If `children` provided, render that; otherwise use Outlet for nested routes
    return isLoggedIn ? (children ?? <Outlet />) : <Navigate to="/login" replace />;
};

export default PrivateRoute;