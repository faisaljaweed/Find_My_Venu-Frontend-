import { useNavigate } from "react-router-dom";
import { LogOut_api } from "../Components/api/User_Api";
import Button from "../Components/Button";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    LogOut_api()
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
