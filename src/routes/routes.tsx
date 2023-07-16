import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../components/BookDetails";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import PrivateRoute from "./privateRoute";
import WishList from "../pages/WishList";
import ReadingList from "../pages/ReadingList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/addbook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/editbook/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/readinglist",
        element: (
          <PrivateRoute>
            <ReadingList />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default routes;
