import { useContext, useState } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

import { useLocation, Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";

const RestaurantsList = () => {
  //   const value =  useContext(RestaurantContext);
  //   console.log(`List Restaurants: ${value.name}`)

  const location = useLocation();
  const restaurants = location.state.restaurants;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const noRestaurants = restaurants.length === 0 || !restaurants;

  const openModal = (phone) => {
    console.log(phone);
    setModalOpen((modalOpen) => !modalOpen);
    setModalData({ phone });
  };

  return (
    <div className="bg-[#efefef] flex flex-col items-center justify-center p-6 gap-12 w-full min-h-screen overflow-y-hidden">
      {modalOpen && (
        <ContactModal
          data={modalData}
          functions={{setModalData, setModalOpen}}
        />
      )}
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
              className="bg-white flex flex-col md:flex-row gap-6 md:gap-6 w-full max-w-4xl h-auto md:h-40 items-center py-8 md:py-2 px-12 rounded-lg shadow"
            >
              <div className="flex flex-col gap-2 items-center md:items-start basis-2/5">
                <div className="text-xl font-bold text-center md:text-left">
                  {name}
                </div>
                <div className="flex flex-row gap-2">
                  {categories.map((category, catIndex) => (
                    <div
                      key={catIndex}
                      className="text-xs font-bold text-white bg-[#007fff] flex justify-center items-center w-20 h-6 rounded-full"
                    >
                      {category}
                    </div>
                  ))}
                </div>
                {url && (
                  <div className="mt-2">
                    <p className="text-xs">
                      Website link:{" "}
                      <a className="text-blue-500 underline"
                      href={`https://${url}`}>
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
                        onClick={() => openModal(phone)}
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
