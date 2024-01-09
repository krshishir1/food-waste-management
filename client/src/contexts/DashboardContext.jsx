import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { getOrganizationDetails } from "../controllers/organization";

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const orgEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [orgDetails, setOrgDetails] = useState();

  useEffect(() => {
    async function details() {
      const response = await getOrganizationDetails(orgEmail);

      if (response[0] === 500) {
        console.log(`Error: ${response[1]}`);
        navigate("/sign-in");
      } else {
        setOrgDetails(response[1]);
        setLoading(false);
      }
    }

    details();
  });

  return orgEmail !== null ? (
    !loading ? (
      <DashboardContext.Provider value={{orgDetails}}>
        {children}</DashboardContext.Provider>
    ) : (
      <h2>Loading...</h2>
    )
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default DashboardContextProvider;
