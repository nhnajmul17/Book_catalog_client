import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import Footer from "./Footer";

export default function Main() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}
