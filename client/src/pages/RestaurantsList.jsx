import { useContext, useState, useEffect, useRef } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

import { useLocation, Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";

import { saveRestaurant } from "../controllers/organization";
import { DashboardContext } from "../contexts/DashboardContext";

const RestaurantsList = () => {
  //   const value =  useContext(RestaurantContext);
  //   console.log(`List Restaurants: ${value.name}`)
  const location = useLocation();
  // const {orgDetails} = useContext(DashboardContext);

  const restaurantsRef = useRef(location.state.restaurants);

  const [restaurants, setRestaurantsList] = useState(
    restaurantsRef.current
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);
  const [filterCriteria, setFilterCriteria] = useState("relevance");

  const noRestaurants = restaurants.length === 0 || !restaurants;

  const openModal = (restaurant) => {
    setModalOpen((modalOpen) => !modalOpen);
    setModalData({ restaurant });
  };

  const filterChange = (criteria) => {
    const arr = [...restaurantsRef.current];
    if (!arr.length) return;

    console.log(criteria);
    setFilterCriteria(criteria);

    if (criteria === "relevance") {
      arr.sort((a, b) => b.score - a.score);
      setRestaurantsList(arr);
    } else if (criteria === "contact_address") {
      setRestaurantsList(arr.filter((restaurant) => restaurant.poi.phone));
    } else if (criteria === "web_address") {
      setRestaurantsList(arr.filter((restaurant) => restaurant.poi.url));
    }
  };

  const FilterRestaurants = () => {
    return (
      <div className="my-5 w-full">
        <div className="flex w-3/5 mx-auto gap-3 justify-end items-center">
          <label className="basis-1/5 text-right mb-2 text-xl font-bold">
            Filter By
          </label>
          <select
            value={filterCriteria}
            onChange={(e) => filterChange(e.target.value)}
            className="p-2 rounded-md bg-white border border-gray-300 text-sm font-medium outline-none"
          >
            <option value="relevance">Most Relevant</option>
            <option value="contact_address">Contact Address</option>
            <option value="web_address">Website Address</option>
          </select>
        </div>
      </div>
    );
  };

  console.log("restaurant")

  const save = async (restaurant) => {
    const orgEmail = localStorage.getItem("email");
    const response = await saveRestaurant(orgEmail, restaurant);

    console.log(response)
    if(response[0] === 201) {
      alert(`Restaurant ${restaurant.poi.name} saved successfully`)
    } else if (response[0] === 500) {
      alert(response[1])
     }
  }

  return (
    <div className="bg-[#efefef] flex flex-col items-center justify-center p-6 gap-12 w-full min-h-screen">
      {modalOpen && (
        <ContactModal
          data={modalData}
          functions={{ setModalData, setModalOpen, save }}
        />
      )}
      {!noRestaurants && <FilterRestaurants />}
      {noRestaurants ? (
        <h2 className="text-lg">No restaurants found</h2>
      ) : (
        restaurants.map((restaurant, index) => {
          const { name, categories, phone, url } = restaurant.poi;
          const { country, countrySubDivision, municipality, freeformAddress } =
            restaurant.address;
          return (
            <div
              key={`res-${index + 1}`}
              className="bg-white flex flex-col md:flex-row gap-6 md:gap-6 w-full max-w-4xl h-auto md:h-40 items-center py-8 md:py-2 px-12 rounded-lg shadow restaurant-card"
            >
              <div className="flex flex-col gap-2 items-center md:items-start basis-2/5">
                <div className="text-xl font-bold text-center md:text-left">
                  {name}
                </div>
                <div className="flex flex-row gap-2">
                  {categories.map((category, catIndex) => (
                    <div
                      key={catIndex}
                      className="text-xs font-bold text-white bg-[#007fff] flex justify-center items-center min-w-24 h-6 rounded-full"
                    >
                      {category}
                    </div>
                  ))}
                  {/* {restaurant.score} */}
                </div>
                {url && (
                  <div className="mt-2">
                    <p className="text-xs">
                      Website link:{" "}
                      <a
                        className="text-blue-500 underline"
                        href={`https://${url}`}
                      >
                        link
                      </a>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center md:items-start">
                <div className="flex flex-row items-center gap-8">
                  <div>
                    {phone && (
                      <p
                        onClick={() => openModal(restaurant)}
                        className="text-base underline text-[#007fff] cursor-pointer"
                      >
                        Contact
                      </p>
                    )}
                  </div>
                  <div className="border-solid border-l border-[#efefef] h-20 hidden md:block" />
                </div>
                <div className="flex flex-col grow gap-3">
                  <div className="block">
                    <p className="text-sm text-center md:text-right">
                      {municipality}, {countrySubDivision}
                      <br className="hidden md:block" />
                      {country}
                    </p>
                  </div>
                  <div className="text-xs text-center md:text-right mt-1">
                    {freeformAddress}
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => save(restaurant)}
                      className="text-white text-sm py-0.5 rounded font-bold bg-blue-500 
                  hover:bg-blue-700 w-1/6 hidden restaurant-btn"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RestaurantsList;
