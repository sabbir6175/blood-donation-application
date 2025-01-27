import { Link } from "react-router-dom";


const SignIn = () => {
    return (
        <div>
            Please login now
           <div>
           <Link to={"/SignUp"}> create user</Link>
           </div>
        </div>
    );
};

export default SignIn;