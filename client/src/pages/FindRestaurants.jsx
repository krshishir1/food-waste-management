import { useEffect, useState } from "react";
import searchApi from "../controllers/fetchRestaurantsApi";

const FindRestaurants = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentCountryCode, setCurrentCountryCode] = useState("");
  const [currentStateCode, setCurrentStateCode] = useState("");

  const [radius, setRadius] = useState(10);

  const [currentCity, setCurrentCity] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCountries() {
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
    async function getStates() {
      const results = await searchApi.get_countries();

      const defaultCountry = results.filter(
        (country) => country.isocode === currentCountryCode
      )[0];

      if (defaultCountry.states.length) {
        setStates(defaultCountry.states);
        setCurrentStateCode(defaultCountry.states[0].isoCode);
      } else {
        setStates([]);
        setCurrentStateCode("");
      }
    }
    console.log(`Country changed: ${currentCountryCode}`);
    getStates();
  }, [currentCountryCode]);

  useEffect(() => {
    async function getCities() {
      if (!currentStateCode || !currentCountryCode) {
        setCurrentCity("");
        setCities([]);
        return;
      };

      const results = await searchApi.get_cities(
        currentCountryCode,
        currentStateCode
      );

      const pResults = results.map((city) => {
        delete city.stateCode;
        delete city.countryCode;

        return city;
      });

      if (pResults.length) {
        setCurrentCity(pResults[0].name);
        setCities(pResults);
      } else {
        setCurrentCity("");
        setCities([]);
      }
    }

    console.log(`State changed: ${currentStateCode}`);

    getCities();
  }, [currentStateCode]);

  const changeCountry = (e) => {
    setCurrentCountryCode(e.target.value);
  };

  const submitForm = () => {
    try {
      let locationDetails = {}

      const currentCityDesc = cities.filter(
        (city) => city.name === currentCity
      )[0];

      let cityExists = currentCityDesc ? true : false;
      let stateExists = currentStateCode !== "" || undefined;
      let countryExists = currentCountryCode !== "" || undefined;  

      if (cityExists) {
        locationDetails = {
            latitude: currentCityDesc.latitude,
            longitude: currentCityDesc.longitude,
            name: currentCityDesc.name,
            type: "city"
        }
      }

      if (stateExists && (Object.keys(locationDetails).length === 0)) {
        const currentState = states.filter(state => state.isoCode === currentStateCode)[0];
        locationDetails = {
            latitude: currentState.latitude,
            longitude: currentState.longitude,
            name: currentState.name,
            isocode: currentState.isoCode,
            type: "state"
        }
      }

      if (countryExists && (Object.keys(locationDetails).length === 0)) {
        const currentCountry = countries.filter(country => country.isocode === currentCountryCode)[0];
        locationDetails = {
            latitude: currentCountry.latitude,
            longitude: currentCountry.longitude,
            name: currentCountry.name,
            isocode: currentCountry.isocode,
            type: "country"
        }
      } 

      const finalObj = {
        ...locationDetails,
        radius
      }

      console.log(finalObj)

      
      // {latitude, longtitude, radius}
    } catch (err) {
      console.log(err);
    }
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
                    defaultValue={country.isocode === currentCountryCode}
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
          onClick={submitForm}
          className="w-full px-4 py-2 font-bold text-white bg-[#007fff] rounded hover:bg-blue-700"
        >
          FIND
        </button>
      </div>
    </div>
  );
};

export default FindRestaurants;