import {  useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

    const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)


      signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "User Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
              toast.warn(error)
            })
 
  };

  return (
    <div className="min-h-screen  shadow-2xl bg-red-600 p-4">
      <div className=" p-4 card w-5/12  mx-auto bg-red-50 backdrop-blur-md ">
        <h2 className="text-3xl mb-4 text-center font-bold animate-bounce">Login</h2>
        <form
          onSubmit={handleSubmit}
          className=" p-4"
        >
          {/* Email */}
          <div className="form-control">
            <label className="label font-semibold">Email : </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label font-semibold">Password : </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              required
            />
          </div>

         

          <button type="submit" className="btn mt-5 bg-red-500 w-full">
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
