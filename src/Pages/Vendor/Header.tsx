import { useEffect, useState } from "react";
import Logo from "../../Components/Logo";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import Logout from "../../Logout/logout";
import "../../Components/Header.css";
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
    <div className="flex justify-between px-20 py-5 " id="header">
      <main>
        <Logo />
      </main>
      <main className="flex">
        <Button className="mr-4 bg-white">
          <span className="text-black font-bold">Contact</span>
        </Button>
        {isLogin ? (
          <span className="" onClick={handleLogout}>
            <Logout />
          </span>
        ) : (
          <Button className="bg-white " onClick={handleLogin}>
            <span className="text-black font-bold">Login</span>
          </Button>
        )}
      </main>
    </div>
  );
};

export default Header;
