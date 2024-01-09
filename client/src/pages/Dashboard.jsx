import { useContext } from "react";

import { DashboardContext } from "../contexts/DashboardContext";
import { deleteRestaurant } from "../controllers/organization";

const Dashboard = () => {
  const { orgDetails } = useContext(DashboardContext);

  const deleteBtn = async (restaurant) => {
    const orgEmail = localStorage.getItem("email");
    const response = await deleteRestaurant(orgEmail, restaurant);

    console.log(response);
    if (response[0] === 200) {
    //   alert("Restaurant deleted successfully");
    } else if (response[0] === 500) {
      alert(response[1]);
    }
  };

  return orgDetails ? (
    <>
      <div className="bg-[#efefef] min-h-screen pt-24 pb-48">
        {orgDetails.savedRestaurants.length > 0 && (
          <h2 className="text-xl mb-6 text-center font-bold">
            Saved Restaurants
          </h2>
        )}
        <div className="flex flex-col items-center gap-12">
          {orgDetails.savedRestaurants.map((restaurant, index) => {
            {
              const { name, categories, phone, url } = restaurant.poi;
              const {
                country,
                countrySubDivision,
                municipality,
                freeformAddress,
              } = restaurant.address;
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
                            onClick={() => openModal(restau)}
                            className="text-xs underline text-[#007fff] cursor-pointer"
                          >
                            {phone}
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
                        <button
                          onClick={() => deleteBtn(restaurant)}
                          className="text-white text-sm py-0.5 rounded font-bold bg-red-500 
                                hover:bg-red-700 w-1/6 hidden restaurant-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          {orgDetails.savedRestaurants.length === 0 && (
            <h2 className="text-2xl font-bold">No Saved Restaurants</h2>
          )}
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default Dashboard;
