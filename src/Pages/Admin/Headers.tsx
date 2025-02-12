import { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../../Logout/logout";
import "../../Components/Header.css";

const Header = () => {
  const [isLogin, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setLogin(!!token);
  }, []);

  const handleLogin = () => {
    setLogin(true);
    navigate("/login");
  };

  const handleLogout = () => {
    setLogin(false);
    navigate("/login");
  };

  return (
    <div
      className="flex flex-col px-5 md:px-10 lg:px-20 py-5 h-auto md:h-[100vh] bg-gray-800"
      id="header"
    >
      {/* Logo Section */}
      <div className="text-2xl md:text-3xl font-bold text-white">
        <h2>Find My Venue</h2>
      </div>

      {/* Navigation Links */}
      <nav className="mt-5 space-y-3 md:space-y-4">
        <NavLink
          to="/admin_dashboard/add_vendor"
          className={({ isActive }) =>
            `block ${
              isActive
                ? "text-[#2e7d32] font-bold"
                : "text-white hover:text-gray-300"
            }`
          }
        >
          Add Vendor
        </NavLink>
        <NavLink
          to="/admin_dashboard/user-detail"
          className={({ isActive }) =>
            `block ${
              isActive
                ? "text-[#2e7d32] font-bold"
                : "text-white hover:text-gray-300"
            }`
          }
        >
          Check User Detail
        </NavLink>
        <NavLink
          to="/admin_dashboard/check-booking-detail"
          className={({ isActive }) =>
            `block ${
              isActive
                ? "text-[#2e7d32] font-bold"
                : "text-white hover:text-gray-300"
            }`
          }
        >
          Check Booking Details
        </NavLink>
        <NavLink
          to="/admin_dashboard/check-product-detail"
          className={({ isActive }) =>
            `block ${
              isActive
                ? "text-[#2e7d32] font-bold"
                : "text-white hover:text-gray-300"
            }`
          }
        >
          Check Product Details
        </NavLink>
      </nav>

      {/* Buttons Section */}
      <main className="flex flex-col mt-6 space-y-4 md:space-y-6">
        <Button className="bg-white py-2 px-4 rounded">
          <span className="text-black font-bold">Contact</span>
        </Button>

        {isLogin ? (
          <span onClick={handleLogout} className="cursor-pointer">
            <Logout />
          </span>
        ) : (
          <Button className="bg-white py-2 px-4 rounded" onClick={handleLogin}>
            <span className="text-black font-bold">Login</span>
          </Button>
        )}
      </main>
    </div>
  );
};

export default Header;
