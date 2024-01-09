import { useEffect, useState, useContext } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";
import searchApi from "../controllers/fetchRestaurantsApi";

const FindRestaurants = () => {
  const [loading, setLoading] = useState(true);

  const {
    countries,
    states,
    cities,
    currentCountryCode,
    currentStateCode,
    radius,
    currentCity,
    setCountries,
    setCurrentCountryCode,
    setCurrentStateCode,
    setCurrentCity,
    setRadius,
    getStates,
    getCities,
    submitRestaurantForm,
  } = useContext(RestaurantContext);

  useEffect(() => {
    async function getCountries() {
      if (currentCountryCode !== "") {
        console.log("Country code already set", currentCountryCode);
        setLoading(false);
        return;
      }

      const results = await searchApi.get_countries();

      setCountries(
        results.map((country) => ({
          ...country,
        }))
      );
      setCurrentCountryCode(results[0].isocode);
      setLoading(false);
    }
    getCountries();
  }, []);

  useEffect(() => {
    console.log(`Country changed: ${currentCountryCode}`);
    getStates();
  }, [currentCountryCode]);

  useEffect(() => {
    console.log(`State changed: ${currentStateCode}`);
    getCities();
  }, [currentStateCode]);

//   console.log(currentCountryCode);

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
                onChange={(e) => setCurrentCountryCode(e.target.value)}
                className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none"
              >
                {countries.map((country) => (
                  <option
                    key={country.isocode}
                    value={country.isocode}
                    selected={country.isocode === currentCountryCode}
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
                onChange={(e) => setCurrentStateCode(e.target.value)}
                className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none"
              >
                {states.map((state) => (
                  <option
                    key={state.isoCode}
                    value={state.isoCode}
                    // selected={country.isocode === currentCountryCode}
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
              <select
                onChange={(e) => setCurrentCity(e.target.value)}
                className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161] outline-none"
              >
                {cities.map((city) => (
                  <option
                    key={city.name}
                    value={city.name}
                    // selected={country.isocode === currentCountryCode}
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
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              type="number"
              className="block w-full p-2 rounded-md bg-white border border-[#3d3a3a] text-sm font-medium text-[#616161]"
            />
          </div>
        </div>

        <button
          onClick={submitRestaurantForm}
          className="w-full px-4 py-2 font-bold text-white bg-[#007fff] rounded hover:bg-blue-700"
        >
          FIND
        </button>
      </div>
    </div>
  );
};

export default FindRestaurants;
