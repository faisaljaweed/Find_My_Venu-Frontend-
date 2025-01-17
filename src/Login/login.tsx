import { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Login_api } from "../Components/api/User_Api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    Login_api({ email, password })
      .then((res) => {
        console.log(res);

        const role = res?.data?.data?.loggedInUser.role;
        console.log(`Role is ${role}`);

        const accessToken = res?.data?.data?.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        const refreshToken = res?.data?.data?.refreshToken;

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        if (role === "admin") {
          navigate("/admin_dashboard");
        } else if (role === "vendor") {
          navigate("/vendor_dashboard");
        } else if (role === "client") {
          navigate("/client_dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
          className=""
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
          className=""
        />
        {showPassword ? (
          <VisibilityIcon onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} />
        )}
        <Button>Login</Button>
      </form>
      <Button>Signup</Button>
    </>
  );
};

export default Login;
