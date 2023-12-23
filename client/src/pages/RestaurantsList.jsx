import { useContext } from "react";
import { RestaurantContext } from "../contexts/RestaurantContext";

const RestaurantsList = () => {

  const value =  useContext(RestaurantContext);
  console.log(`List Restaurants: ${value.name}`)

  return (
    <div className="bg-[#efefef] flex flex-col items-center justify-center p-6 gap-12 w-full min-h-screen font-['Inter']">
      <div className="bg-white flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-4xl h-auto md:h-40 items-center py-5 px-8 rounded-lg shadow">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <div className="text-xl font-semibold text-center md:text-left">
            Food Jakshan
          </div>
          <div className="flex flex-row gap-2">
            <div className="text-xs font-bold text-white bg-[#007fff] flex justify-center items-center w-20 h-6 rounded-full">
              Indian
            </div>
            <div className="text-xs font-bold text-white bg-[#007fff] flex justify-center items-center w-20 h-6 rounded-full">
              Indian
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center md:items-start">
          <div className="flex flex-row items-center gap-8">
            <div className="text-lg underline text-[#007fff] cursor-pointer">
              Contact
            </div>
            <div className="border-solid border-l border-[#efefef] h-20 hidden md:block" />
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <div className="text-base font-medium text-center md:text-left">
              Uttar Pradesh(UP)
              <br />
              India (IN)
            </div>
            <div className="text-base text-center md:text-left">
              Delhi Road, Nagar Palika Parisad, Sector 62
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsList;

export const loadRestaurants = () => {

}
