import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import auth from "../utils/firebase.config";
import { setUser } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to="/products">
              <img className="h-8" src="" alt="logo" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Link to="/products">
                  <button className="py-2 px-4 mx-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    All Books
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <button className="py-2 mx-2 px-4 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Dashboard
                  </button>
                </Link>
              </li>
              {/* <li>
                  <button>
                    <Link to="/cart">
                      <HiOutlineShoppingCart size="25" />
                    </Link>
                  </button>
                </li> */}
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li>
                <a className="justify-between">User Name</a>
              </li> */}
              {user.email && (
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              )}
              {!user.email && (
                <li>
                  <Link to="/login">
                    <a>Login</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
