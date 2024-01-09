import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";

const UserProfile = () => {

  const {orgDetails} = useContext(DashboardContext);
  const {orgName, orgEmail, orgAddress} = orgDetails 

  return (
    <>
      <h2 className="text-2xl">All about the user</h2>
    </>
  );
};

export default UserProfile;
