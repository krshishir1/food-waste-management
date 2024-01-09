import { useState } from "react";
import { loginOrganization } from "../controllers/organization";
import {useNavigate} from "react-router-dom";

const OrganizationSignin = () => {
  const [orgEmail, setOrgEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await loginOrganization({ orgEmail, password });

    if (response[0] === 500) {
      setMessage(response[1]);
    } else {
      console.log("Authentication Done! Congrats")
      localStorage.setItem("email", response[1].orgEmail)
      navigate("/dashboard")
    }
  };

  const DisplayMessage = () => (
    <div className="bg-red-200 rounded p-4 mb-6">
      <h3 className="text-sm font-bold mb-2">{message}</h3>
    </div>
  );

  return (
    <>
      <div className="bg-white p-8 border border-black max-w-xl mx-auto my-20">
        <form onSubmit={submitForm}>
          {/* {errors.length > 0 && <DisplayErrors />} */}
          {message && <DisplayMessage />}
          <div className="mb-6">
            <label className="block text-base font-medium mb-2">
              Organization Email Id
              <input
                className="w-full border border-black px-3 py-2 mt-2"
                type="email"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                placeholder="info@wellfound.com"
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium mb-2">
              Enter password
              <input
                className="w-full border border-black px-3 py-2 mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#007fff] text-white text-xl font-bold rounded-lg py-2 px-16"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default OrganizationSignin;
