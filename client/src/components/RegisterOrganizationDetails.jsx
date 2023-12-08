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
    registerNewOrganization,
  } = useContext(RegisterOrganizationContext);

  const [errors, setErrors] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const { data, status } = await registerNewOrganization();

    console.log(data, status)

    if (status === 400) {
      setErrors(data.errors);
      setResponseMessage("")
    } 
    
    else if (status === 401) {
      setErrors([]);
      setResponseMessage(data.message)
    } 
    
    else if (status === 201) {
      setErrors([]);
      setResponseMessage(data.message)
    }

  };

  const DisplayErrors = () => (
    <div className="bg-red-200 rounded p-4 mb-6">
      <h3 className="text-sm text-red-700 font-bold mb-2">Errors</h3>
      <ul>
        {errors.map((error, i) => (
          <li key={`err-${i}`} className="text-xs text-red-700">
            {i + 1}) {error.message}
          </li>
        ))}
      </ul>
    </div>
  );

  const DisplaySuccess = () => (
    <div className="bg-green-200 rounded p-4 mb-6">
      <h3 className="text-sm font-bold mb-2">{responseMessage}</h3>
    </div>
  );

  return (
    <div className="bg-white p-8 border border-black max-w-xl mx-auto my-20">
      <form onSubmit={submitForm}>
        {errors.length > 0 && <DisplayErrors />}
        {responseMessage && <DisplaySuccess />}
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

        <button
          type="submit"
          className="bg-[#007fff] text-white text-xl font-bold rounded-lg py-2 px-16"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default RegisterOrganizationDetails;
