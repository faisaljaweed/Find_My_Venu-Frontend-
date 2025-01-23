import { useEffect, useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/logout";

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
    <div className="flex justify-between px-20">
      <Logo />
      {isLogin ? (
        <span className="" onClick={handleLogout}>
          <Logout />
        </span>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
};

export default Header;
