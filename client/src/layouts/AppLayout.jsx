import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />

      {/* <main> */}
      <Outlet />
      {/* </main> */}
    </>
  );
};

export default AppLayout;
