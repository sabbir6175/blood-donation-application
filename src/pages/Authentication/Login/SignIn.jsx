import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SignIn = () => {
  const { signInUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("");

  const users = {
    Admin: { email: "sabbirhasannahid6175@gmail.com", password: "Sabbir@123" },
    Volunteer: { email: "numan234@gmail.com", password: "Numan@12" },
    Donor: { email: "masumbillah@gmail.com", password: "Masum@12" },
  };

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    if (users[role]) {
      setLoginData(users[role]);
    } else {
      setLoginData({ email: "", password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.warn(error);
      });
  };

  return (
    <div className="md:mt-20 p-4">
      <div className="p-4 card lg:w-5/12 mx-auto border backdrop-blur-md">
        <h2 className="text-2xl md:text-3xl text-center font-bold mb-10">
          Welcome Back to Login
        </h2>

        <div className="mb-5 md:p-4">
          <label className="font-semibold">Select Role:</label>
          <select
            className="select select-bordered w-full"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="">Choose Role</option>
            <option value="Admin">Admin</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Donor">Donor</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="md:p-4 w-full">
          {/* Email */}
          <div className="form-control">
            <label className="label font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn mt-5 text-white bg-green-400 w-full">
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            Don't have an account? <Link to="/SignUp" className="text-green-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
