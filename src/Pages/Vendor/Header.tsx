// import { useEffect, useState } from "react";
// // import Logo from "../../Components/Logo";
// import Button from "../../Components/Button";
// import { NavLink, useNavigate } from "react-router-dom";
// import Logout from "../../Logout/logout";
// import "../../Components/Header.css";
// const Header = () => {
//   const [isLogin, setLogin] = useState(true);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setLogin(true);
//     } else {
//       setLogin(false);
//     }
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
//     <div className="flex flex-col px-20 py-5 h-[100vh]" id="header">
//       <main>
//         <div className="text-3xl font-bold">
//           <h2 className="text-white">Find My Venue</h2>
//         </div>
//       </main>
//       <NavLink to="/vendor_dashboard/check_booking">
//         <h1>Check Booking</h1>
//       </NavLink>
//       <NavLink to="/vendor_dashboard/booking_details">
//         <h1>Booking Details</h1>
//       </NavLink>
//       <NavLink to="/vendor_dashboard/add_product">
//         <h1>Add Product</h1>
//       </NavLink>
//       <main className="flex flex-col">
//         <Button className="mr-4 bg-white">
//           <span className="text-black font-bold">Contact</span>
//         </Button>
//         {isLogin ? (
//           <span className="" onClick={handleLogout}>
//             <Logout />
//           </span>
//         ) : (
//           <Button className="bg-white " onClick={handleLogin}>
//             <span className="text-black font-bold">Login</span>
//           </Button>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Header;

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
          to="/vendor_dashboard/check_booking"
          className="text-white block hover:text-gray-300"
        >
          Check Booking
        </NavLink>
        <NavLink
          to="/vendor_dashboard/booking_details"
          className="text-white block hover:text-gray-300"
        >
          Booking Details
        </NavLink>
        <NavLink
          to="/vendor_dashboard/add_product"
          className="text-white block hover:text-gray-300"
        >
          Add Product
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
