import { useContext } from "react";
import { CgLogOut } from "react-icons/cg";
import { RiDashboardFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AuthContext from "../../../AuthContext/AuthContext";
// import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, singOutUser } = useContext(AuthContext);

  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        toast.error("Failed to sign out", error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "shadow-sm border-b-2 border-green-500 "
      : "hover:text-green-600 px-3 py-2 transition duration-300";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/Search" className={navLinkClass}>
          Search
        </NavLink>
      </li>
      <li>
        <NavLink to="/donationRequest" className={navLinkClass}>
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" className={navLinkClass}>
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" className={navLinkClass}>
          FAQ
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/funding-page" className={navLinkClass}>
            Funding Links
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 z-20 w-full text-black bg-gradient-to-r from-red-200 to-green-100 bg-opacity-80 backdrop-blur-md">
      <div className="text-black navbar md:px-10">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
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
              className="menu menu-sm dropdown-content bg-gradient-to-r from-red-200 to-green-100 text-black rounded-sm z-[1] mt-2 w-52 p-2 shadow-2xl"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/vCVdBSj0/logo.webp"
              alt="Logo"
              className=""
            />
          </div>
        </div>

        {/* Navbar Center */}
        <div className="hidden navbar-center lg:flex">
          <ul className="gap-2 px-1 menu menu-horizontal">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center gap-3 navbar-end">
          {user && <h1 className="font-medium">{user?.displayName}</h1>}

          {user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="mr-3">
                <img
                  src={user?.photoURL}
                  className="w-10 h-10 transition border-2 border-green-400 rounded-full hover:scale-105"
                  alt="User"
                />
              </button>
              <ul
                tabIndex={0}
                className="mt-2 text-black shadow-lg dropdown-content bg-gradient-to-r from-red-200 to-green-100 menu menu-compact rounded-box w-44"
              >
                <li>
                  <Link to="/dashboard/profile">
                    <RiDashboardFill /> Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleSingOut}>
                    <CgLogOut className="-rotate-180" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/SignIn"
              className="text-black transition border-none shadow-md bg-gradient-to-r from-green-300 to-green-500 btn btn-sm md:btn-md hover:from-green-400 hover:to-green-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
