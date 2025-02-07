import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import useDonor from "../Hooks/useDonor";


const DonorRouter = (children) => {
    const [user, loading] = useContext(AuthContext); 
    const [isDonor, isDonarLoading] = useDonor();
    const location = useLocation();

    if(loading || isDonarLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isDonor) {
        return children;
    }
    return <Navigate to="/SignIn" state={{from: location}} replace></Navigate>
};

export default DonorRouter;