import { useEffect, useState } from "react";
import searchApi from "../controllers/fetchRestaurantsApi";

const FindRestaurants = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [defaultCountryCode, setDefaultCountryCode] = useState("IN");
  const [defaultStateCode, setDefaultStateCode] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCountries() {
      const results = await searchApi.get_countries();

      setCountries(
        results.map((country) => ({
          name: country.name,
          isocode: country.isocode,
        }))
      );
      setDefaultCountryCode(results[0].isocode);
      setLoading(false);
    }

    getCountries();
  }, []);

  useEffect(() => {
    async function getStates() {
      const results = await searchApi.get_countries();

      const defaultCountry = results.filter(
        (country) => country.isocode === defaultCountryCode
      )[0];

      setStates(defaultCountry.states);
      setDefaultStateCode(defaultCountry.states[0].isoCode);
    }
    console.log(`Country changed: ${defaultCountryCode}`);
    getStates();
  }, [defaultCountryCode]);

  useEffect(() => {
    async function getCities() {
      if (!defaultStateCode || !defaultCountryCode) return;

      const results = await searchApi.get_cities(
        defaultCountryCode,
        defaultStateCode
      );

      const pResults = results.map((city) => {
        delete city.stateCode;
        delete city.countryCode;

        return city;
      });

      setCities(pResults);
    }

    console.log(`State changed: ${defaultStateCode}`);

    getCities();
  }, [defaultStateCode]);

  const changeCountry = (e) => {
    setDefaultCountryCode(e.target.value);
  };

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="flex flex-col items-center justify-start pt-10 h-screen bg-[#efefef]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium">Find Restaurants</h1>
      </div>

      <div className="w-full max-w-lg p-8 bg-white border rounded-lg border-[#3d3a3a]">
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 text-xl font-medium text-[#616161]">
              Country
            </label>
            <div>
              <select
                onChange={(e) => changeCountry(e)}
                className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none"
              >
                {countries.map((country) => (
                  <option
                    key={country.isocode}
                    value={country.isocode}
                    selected={country.isocode === defaultCountryCode}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-[#616161]">
              State
            </label>
            <div>
              <select
                onChange={(e) => setDefaultStateCode(e.target.value)}
                className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none"
              >
                {states.map((state) => (
                  <option
                    key={state.isoCode}
                    value={state.isoCode}
                    // selected={country.isocode === defaultCountryCode}
                  >
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-xl font-medium text-[#616161]">
              City
            </label>
            <div>
              <select className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none">
                {cities.map((city) => (
                  <option
                    key={city.name}
                    value={city.name}
                    // selected={country.isocode === defaultCountryCode}
                  >
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-xl font-medium text-[#616161]">
              Radius (in km)
            </label>
            <input
              type="number"
              className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161]"
            />
          </div>
        </div>

        <button className="w-full px-4 py-2 font-bold text-white bg-[#007fff] rounded hover:bg-blue-700">
          FIND
        </button>
      </div>
    </div>
  );
};

export default FindRestaurants;
