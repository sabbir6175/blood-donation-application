import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { RiDashboardFill } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const { user, singOutUser } = useContext(AuthContext);  // Use context to get user state

  // Define links to show on the navbar
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/donationRequest">Donation Requests</Link>
      </li>
      <li>
        <Link to="/blogs">Blog</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/">Funding Links</Link>
          </li>
        </>
      )}
    </>
  );

  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "user logout Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        toast.error('Failed to sign out', error);
      });
  };

  return (
    <div className="navbar  bg-gradient-to-r from-red-600 to-red-500  sticky text-black top-0 z-10 backdrop-blur-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://i.ibb.co/J3tCD0M/blood-logo.jpg"
            className="w-12 h-12 outline-red-600 rounded-full outline"
            alt="Logo"
          />
          <h1 className="text-4xl text-white animate-pulse uppercase">Blood</h1>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <li className="list-none">
            <div className="dropdown">
              <button tabIndex={0} className=" mr-5">
                <img src={user?.photoURL} className='w-10 h-10 outline outline-green-600 rounded-full' alt="User photoURL" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content -ml-36 bg-red-400 text-white menu menu-compact  rounded-box w-52 shadow-lg mt-2"
              >
                <li>
                  <Link to="/dashboard"> <RiDashboardFill></RiDashboardFill> Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleSingOut}><CgLogOut className="-rotate-180"></CgLogOut> Logout</button>
                </li>
                <li>
                    {user.displayName}
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <Link to="/SignIn" className="btn bg-white text-red-700 outline-none animate-pulse">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
