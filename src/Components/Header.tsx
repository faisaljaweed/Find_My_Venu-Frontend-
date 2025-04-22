// import { useEffect, useState } from "react";
// import Logo from "./Logo";
// import Button from "./Button";
// import { useNavigate } from "react-router-dom";
// import Logout from "../Logout/logout";
// import "./Header.css";

// const Header = () => {
//   const [isLogin, setLogin] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setLogin(!!token);
//   }, []);

//   const handleLogin = () => {
//     setLogin(true);
//     navigate("/login");
//   };

//   const handleLogout = () => {
//     setLogin(false);
//     navigate("/login");
//   };

//   return (
//     <div
//       className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-4 font-bold bg-transparent"
//       id="header"
//     >
//       {/* Logo Section */}
//       <main className="mb-4 md:mb-0">
//         <Logo />
//       </main>

//       {/* Navigation and Buttons */}
//       <main className="flex flex-col md:flex-row items-center gap-4">
//         <Button
//           className="bg-[#4b1011] w-full md:w-auto"
//           onClick={() => navigate("/contact")}
//         >
//           <span className="text-white font-bold font-Playfair Display">
//             Contact
//           </span>
//         </Button>

//         {isLogin ? (
//           <span onClick={handleLogout} className="w-full md:w-auto">
//             <Logout />
//           </span>
//         ) : (
//           <Button
//             className="bg-[#4b1011] w-full md:w-auto"
//             onClick={handleLogin}
//           >
//             <span className="text-white font-bold font-Playfair Display">
//               Login
//             </span>
//           </Button>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";
import { Menu, X, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut_api } from "./api/User_Api";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    LogOut_api()
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
        setLogin(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
  }`;

  const textColorClass = isScrolled ? "text-gray-900" : "text-white";
  const logoClass = isScrolled ? "text-gray-900" : "text-gray-900";
  const buttonClass = isScrolled
    ? "bg-amber-600 hover:bg-amber-700 text-white"
    : "bg-white hover:bg-gray-100 text-gray-900";

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="/"
                className={`text-xl font-bold font-serif ${logoClass}`}
              >
                Find My Venue
              </a>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${textColorClass}`}
              >
                <Heart size={20} />
              </button>
              <button
                className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${textColorClass}`}
              >
                <User size={20} />
              </button>
              {isLogin ? (
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${buttonClass}`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${buttonClass}`}
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
              {/* <button
                className={`px-4 py-2 rounded-md transition-colors ${buttonClass}`}
              >
                Add Listing
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-md ${textColorClass}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 border-t">
              {isLogin ? (
                <button
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  onClick={handleLogin}
                >
                  <span className="text-white font-bold font-Playfair Display">
                    Login
                  </span>
                </button>
              )}
              <button className=" mt-2 w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
