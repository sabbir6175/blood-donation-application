import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";


const AdminRoute = (children) => {
    const [user, loading] = useContext(AuthContext); 
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/SignIn" state={{from: location}} replace></Navigate>
};

export default AdminRoute;