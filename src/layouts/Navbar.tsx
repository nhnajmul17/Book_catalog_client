import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { signOut } from "firebase/auth";
import auth from "../utils/firebase.config";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      toast.success("Logged out Successfull");
    });
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-blue-50">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className=" sm:ml-4">
            <Link to="/">
              <img
                className="h-8 bg-blue-100 rounded-full"
                src="https://bookxchanger.netlify.app/static/media/final.cdd2833e.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="hidden md:block lg:block">
            <ul className="flex  items-center">
              <li>
                <Link to="/allbooks">
                  <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    All Books
                  </button>
                </Link>
              </li>
              {user?.email && (
                <>
                  <li>
                    <Link to="/">
                      <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Recently Added
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/addbook">
                      <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Add New Book
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Wish List
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/readinglist">
                      <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Reading List
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {!user?.email && (
                <>
                  <li>
                    <Link to="/login">
                      <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="py-2 mx-2 px-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        SignUp
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://github.com/euotiniel.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user.email && (
                <div className="hidden md:block lg:block">
                  <li>
                    <a className="justify-between">{user.email}</a>
                  </li>
                  <li onClick={handleLogout}>
                    <a>Logout</a>
                  </li>
                </div>
              )}
              {user.email && (
                <div className="block md:hidden lg:hidden">
                  <li>
                    <a className="justify-between">User: {user.email}</a>
                  </li>
                  <li>
                    <Link to="/allbooks">
                      <a className="font-bold">All Books</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <a className="font-bold">Recently Added</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/addbook">
                      <a className="font-bold">Add New Book</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <a className="font-bold">Wish List</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/readinglist">
                      <a className="font-bold">Reading List</a>
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <a className="font-bold">Logout</a>
                  </li>
                </div>
              )}
              {!user.email && (
                <div className="block md:hidden lg:hidden">
                  <li>
                    <Link to="/allbooks">
                      <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        All Books
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="py-2 px-4 mx-4 bg-blue-50 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        SignUp
                      </button>
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
