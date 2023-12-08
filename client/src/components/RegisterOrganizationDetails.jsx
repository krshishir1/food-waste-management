import { useContext, useState } from "react";
import { RegisterOrganizationContext } from "../contexts/RegisterOrganization";

const RegisterOrganizationDetails = () => {
  const {
    orgName,
    orgEmail,
    orgAddress,
    setOrgName,
    setOrgEmail,
    setOrgAddress,
    password,
    setPassword,
    registerNewOrganization
  } = useContext(RegisterOrganizationContext);

  const [errors, setErrors] = useState([])

  const submitForm = (e) => {
    e.preventDefault()

    registerNewOrganization()
  }

  return (
    <div className="bg-white p-8 border border-black max-w-xl mx-auto my-20">
      <form onSubmit={submitForm}>
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">
            Organization Name
          </label>
          <input
            className="w-full border border-black px-3 py-2"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Wellfound"
          />
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">
            Organization Email Id
          </label>
          <input
            className="w-full border border-black px-3 py-2"
            type="email"
            value={orgEmail}
            onChange={(e) => setOrgEmail(e.target.value)}
            placeholder="info@wellfound.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">
            Organization Address
          </label>
          <textarea
            className="w-full border border-black px-3 py-2"
            value={orgAddress}
            onChange={(e) => setOrgAddress(e.target.value)}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-base font-medium mb-2">
            Set up password
          </label>
          <input
            className="w-full border border-black px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit"
         className="bg-[#007fff] text-white text-xl font-bold rounded-lg py-2 px-16">
          Next
        </button>
      </form>
    </div>
  );
};

export default RegisterOrganizationDetails;
