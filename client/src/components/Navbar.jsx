import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-[#007fff] flex justify-between items-center py-3 px-8 navbar">
          <Link to="/" className="text-2xl font-semibold text-white">
            Food Waste Management
          </Link>
          <div className="flex gap-5">
            <Link to="/" className="text-xl font-medium text-white">
              Home
            </Link>
            <Link to="/register-organization" className="text-xl font-medium text-white">
              Sign In
            </Link>
          </div>
        </nav>
      );
}
 
export default Navbar;