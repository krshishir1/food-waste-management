import { useEffect, useState } from "react";
import "./App.css";

import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";

// import fetchNearbyPois from "./controllers/fetchNearbyPois";
// import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import OrganizationRegister from "./pages/OrganizationRegister";
import AppLayout from "./layouts/AppLayout";
import PageNotFound from "./pages/PageNotFound";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/register-organization" element={<OrganizationRegister />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  )

  // const [nearbyPois, setNearbyPois] = useState([]);

  // function getGeolocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(handleFetchNearbyPois);
  //   }
  // }

  // const handleFetchNearbyPois = async (position) => {
  //   const { latitude, longitude } = position.coords;
  //   const response = await fetchNearbyPois(latitude, longitude);
  //   if (Array.isArray(response.results)) {
  //     const allPoisArr = [];
  //     response.results.forEach((result) => {
  //       allPoisArr.push({
  //         address: result.address,
  //         poi: result.poi,
  //       });
  //     });

  //     setNearbyPois(allPoisArr);
  //   }
  // };

  // const displayNearbyPois = () => {
  //   return nearbyPois.map(({ poi, address }) => {

  //     const { name, phone, categories} = poi;
  //     const {country, countrySubdivision, freeformAddress} = address;

  //     console.log(address)

  //     return (
  //       <div className="flex w-full items-center pt-6 pl-px">
  //         <div className="bg-white flex gap-12 w-full h-40 items-start mb-6 mr-0 pt-5 px-8 rounded-lg">
  //           <div className="flex flex-col gap-3 w-1/3 items-start">
  //             <div className="text-base font-semibold">
  //               {name}
  //             </div>

  //             <div className="flex flex-row gap-2 w-full items-start">
  //               {Array.isArray(categories) && categories.map((category) => (
  //                  <div className="text-xs font-bold text-white bg-[#007fff] flex flex-row justify-center pt-1 w-20 p-2 h-6 items-center rounded-[31px]">
  //                  {category}
  //                </div>
  //               ))}
  //             </div>


  //           </div>

  //           <div className="flex flex-row gap-8 w-1/5 items-start">
  //               {
  //                 phone && (
  //                   <div className="text-sm underline text-[#007fff]">
  //                   Contact
  //                 </div>
  //                 )
  //               }
  //               <div
  //                 id="Line"
  //                 className="border-solid border-[#efefef] mt-4 w-px h-20 border-r border-l-0 border-y-0"
  //               />
  //             </div>

  //             <div className="flex flex-col mt-1 gap-3 w-1/2 items-start">
  //               <div className="text-sm align font-medium">
  //                 {countrySubdivision}
  //                 <br />
  //                 {country}
  //               </div>
  //               <div className="text-xs">
  //                 {freeformAddress}
  //                 <br />
  //               </div>
  //             </div>

  //           {/* <div className="flex flex-row gap-10 w-2/5 items-start">
              

             
  //           </div> */}
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
