import { createContext, useState } from "react";
import searchApi from "../controllers/fetchRestaurantsApi";
import {useNavigate} from "react-router-dom";

import FindRestaurants from "../pages/FindRestaurants";
import RestaurantsList from "../pages/RestaurantsList";

export const RestaurantContext = createContext();

const RestaurantContextProvider = ({ children }) => {
  const navigate = useNavigate();  

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState(null)

  const [currentCountryCode, setCurrentCountryCode] = useState("");
  const [currentStateCode, setCurrentStateCode] = useState("");

  const [radius, setRadius] = useState(10);

  const [currentCity, setCurrentCity] = useState("");

  const getStates = async function () {
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
  };

  const getCities = async function () {
    if (!currentStateCode || !currentCountryCode) {
      setCurrentCity("");
      setCities([]);
      return;
    }

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
  };

  const submitRestaurantForm = async function () {
    try {
      let locationDetails = {};

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
          type: "city",
        };
      }

      if (stateExists && Object.keys(locationDetails).length === 0) {
        const currentState = states.filter(
          (state) => state.isoCode === currentStateCode
        )[0];
        locationDetails = {
          latitude: currentState.latitude,
          longitude: currentState.longitude,
          name: currentState.name,
          isocode: currentState.isoCode,
          type: "state",
        };
      }

      if (countryExists && Object.keys(locationDetails).length === 0) {
        const currentCountry = countries.filter(
          (country) => country.isocode === currentCountryCode
        )[0];
        locationDetails = {
          latitude: currentCountry.latitude,
          longitude: currentCountry.longitude,
          name: currentCountry.name,
          isocode: currentCountry.isocode,
          type: "country",
        };
      }

      const finalObj = {
        ...locationDetails,
        radius,
      };

      await navigateRestaurants(finalObj);

    } catch (err) {
      console.log(err);
    }
  };

  const navigateRestaurants = async function(details) {
    const results = await searchApi.get_restaurants(details)

    console.log(results, "navigation")
    
    navigate("/dashboard/restaurants", {state: {restaurants: results}})
  }

  const value = {
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
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;
