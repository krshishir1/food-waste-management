const Navbar = () => {
    return (
        <nav className="bg-[#007fff] flex justify-between items-center py-3 px-8 navbar">
          <h1 className="text-2xl font-semibold text-white">
            Register your organization
          </h1>
          <div className="flex gap-5">
            <button className="text-xl font-medium text-white">
              Home
            </button>
            <button className="text-xl font-medium text-white">
              Sign In
            </button>
          </div>
        </nav>
      );
}
 
export default Navbar;