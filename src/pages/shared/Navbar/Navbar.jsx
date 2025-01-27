import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  // Define links to show on the navbar
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/Search">Search Page</Link>
      </li> */}
      <li>
        <Link to="/">Donation Requests</Link>
      </li>
      <li>
        <Link to="/">Blog</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/">Funding Links</Link>
          </li>
          <li>
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost">
                <img
                  src={user.avatar || "https://i.ibb.co/9YHg9dT/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-compact bg-base-100 rounded-box w-52 shadow-lg mt-2"
              >
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
                <li>
                  <Link to="/">Logout</Link>
                </li>
              </ul>
            </div>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar  bg-slate-50 sticky top-0 z-10 backdrop-blur-md">
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
        <div>
          <img
            src="https://i.ibb.co/J3tCD0M/blood-logo.jpg"
            className="w-12 h-12 outline-red-600 rounded-full outline"
            alt="Logo"
          />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <Link to={"/SignIn"} className="btn bg-green-500 text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
