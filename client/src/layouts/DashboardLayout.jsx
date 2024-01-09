import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/DashboardNavbar";
import RestaurantContextProvider from "../contexts/RestaurantContext";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />

      <RestaurantContextProvider>
        <Outlet />
      </RestaurantContextProvider>
    </>
  );
};

export default DashboardLayout;
