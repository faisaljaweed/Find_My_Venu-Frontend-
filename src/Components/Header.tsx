import { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setLogin(!isLogin);
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
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
};

export default Header;
