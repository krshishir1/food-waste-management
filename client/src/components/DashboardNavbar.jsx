import { Link } from "react-router-dom";

const DashboardNavbar = () => {
    return (
        <nav className="bg-green-700 flex justify-between items-center py-3 px-8 navbar">
          <Link to="/dashboard" className="text-xl font-semibold text-white">
            Dashboard
          </Link>
          <div className="flex gap-5">
            <Link to="/dashboard/find-restaurants" className="text-lg font-medium text-white">
              Find Restaurants
            </Link>
            <Link to="/" className="text-lg font-medium text-white">
              Profile
            </Link>
            <Link to="/" className="text-lg font-medium text-white">
              Log out
            </Link>
          </div>
        </nav>
      );
}
 
export default DashboardNavbar;