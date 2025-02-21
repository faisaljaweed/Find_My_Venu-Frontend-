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
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
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
      className="flex justify-between px-20 py-5 font-bold bg-transparent"
      id="header"
    >
      <main>
        <Logo />
      </main>
      <main className="flex">
        <Button
          className="mr-4 bg-[#4b1011] "
          onClick={() => {
            navigate("/contact");
          }}
        >
          <span className="text-white font-bold font-Playfair Display">
            Contact
          </span>
        </Button>
        {isLogin ? (
          <span onClick={handleLogout}>
            <Logout />
          </span>
        ) : (
          <Button className="bg-[#4b1011] " onClick={handleLogin}>
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
