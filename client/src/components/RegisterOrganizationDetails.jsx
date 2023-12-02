const RegisterOrganizationDetails = () => {
  return (
    <div className="bg-white p-8 border border-black max-w-xl mx-auto my-20">
      <div className="mb-6">
        <label className="block text-base font-medium mb-2">
          Organization Name
        </label>
        <input
          className="w-full border border-black px-3 py-2"
          type="text"
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
          placeholder="info@wellfound.com"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-base font-medium mb-2"
        >
          Organization Address
        </label>
        <textarea
          className="w-full border border-black px-3 py-2"
          id="org-address"
          rows="4"
        ></textarea>
      </div>
      <button className="bg-[#007fff] text-white text-xl font-bold rounded-lg py-2 px-16">
        Next
      </button>
    </div>
  );
};

export default RegisterOrganizationDetails;
