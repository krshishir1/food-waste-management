import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />

      {/* <main> */}
      <Outlet />
      {/* </main> */}
    </>
  );
};

export default DashboardLayout;
