import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/logout";
import "./Header.css";

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
      className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-4 font-bold bg-transparent"
      id="header"
    >
      {/* Logo Section */}
      <main className="mb-4 md:mb-0">
        <Logo />
      </main>

      {/* Navigation and Buttons */}
      <main className="flex flex-col md:flex-row items-center gap-4">
        <Button
          className="bg-[#4b1011] w-full md:w-auto"
          onClick={() => navigate("/contact")}
        >
          <span className="text-white font-bold font-Playfair Display">
            Contact
          </span>
        </Button>

        {isLogin ? (
          <span onClick={handleLogout} className="w-full md:w-auto">
            <Logout />
          </span>
        ) : (
          <Button
            className="bg-[#4b1011] w-full md:w-auto"
            onClick={handleLogin}
          >
            <span className="text-white font-bold font-Playfair Display">
              Login
            </span>
          </Button>
        )}
      </main>
    </div>
  );
};

export default Header;
