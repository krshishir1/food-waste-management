import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("email");
    navigate("/sign-in")
  }

    return (
        <nav className="bg-green-700 flex justify-between items-center py-3 px-8 navbar">
          <Link to="/dashboard" className="text-xl font-semibold text-white">
            Dashboard
          </Link>
          <div className="flex gap-5">
            <Link to="/dashboard/find-restaurants" className="text-lg font-medium text-white">
              Find Restaurants
            </Link>
            <Link to="/dashboard/profile" className="text-lg font-medium text-white">
              Profile
            </Link>
            <Link onClick={logout} className="text-lg font-medium text-white">
              Log out
            </Link>
          </div>
        </nav>
      );
}
 
export default DashboardNavbar;