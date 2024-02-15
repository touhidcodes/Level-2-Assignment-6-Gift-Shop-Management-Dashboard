import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { logOut, useCurrentUser } from "../../../redux/features/auth/authSlice";

const Headers = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  const navItems = (
    <>
      <li>
        {!user ? (
          <Link to="/register">
            <a>Register</a>
          </Link>
        ) : (
          ""
        )}
      </li>
      <li>
        <Link to="/dashboard/welcome">
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <a>About Us</a>
      </li>
    </>
  );
  return (
    <div className="bg-blue-950">
      <div className="navbar  max-w-screen-xl text-white px-10">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Gift Shop</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  text-xl">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button className="btn" onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Headers;
