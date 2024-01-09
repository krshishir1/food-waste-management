import { Link } from "react-router-dom";

const Navbar = () => {
  const currentEmail = localStorage.getItem("email");
  const emailExists = currentEmail !== null;

  return (
    <nav className="bg-[#007fff] flex justify-between items-center py-3 px-8 navbar">
      <Link to="/" className="text-2xl font-semibold text-white">
        Food Waste Management
      </Link>
      <div>
        {emailExists ? (
          <Link to="/dashboard" className="text-xl font-medium text-white">
            Dashboard
          </Link>
        ) : (
          <div className="flex gap-5">
            <Link to="/sign-in" className="text-xl font-medium text-white">
              Sign In
            </Link>
            <Link
              to="/register-organization"
              className="text-xl font-medium text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
