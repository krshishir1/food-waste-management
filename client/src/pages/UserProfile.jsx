import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";

const UserProfile = () => {
  const { orgDetails } = useContext(DashboardContext);
  const { orgName, orgEmail, orgAddress } = orgDetails;

  return (
    <>
      <div className="bg-[#efefef] w-full h-screen py-10 flex flex-col items-center">
        <h1 className="text-3xl font-medium mb-8">User Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-8 w-2/5">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Organization Name:
            </label>
            <input
              type="text"
              value={orgName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline select-none"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Organization Email:
            </label>
            <input
              type="text"
              value={orgEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline select-none"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Organization Address:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              rows="4"
              disabled
            >
              {orgAddress}
            </textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
