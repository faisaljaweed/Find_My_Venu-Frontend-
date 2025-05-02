import { useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Login_api } from "../Components/api/User_Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setLoading(true);
    Login_api({ email, password })
      .then((res) => {
        // console.log(res);

        const user = res?.data?.data?.loggedInUser;
        localStorage.setItem("user", JSON.stringify(user));

        const role = res?.data?.data?.loggedInUser.role;
        console.log(`Role is ${role}`);

        localStorage.setItem("role", role);

        const accessToken = res?.data?.data?.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        const refreshToken = res?.data?.data?.refreshToken;

        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        const emailToken = res?.data?.data?.loggedInUser.emailToken;
        console.log(`Email Token is ${emailToken}`);
        if (emailToken) {
          localStorage.setItem("emailToken", emailToken);
        }
        const isVerified = res?.data?.data?.loggedInUser.isVerified;
        console.log(`isVerified is ${isVerified}`);
        if (isVerified === false) {
          navigate("/verify-email");
          toast.error("Email Not Verified");
        } else if (role === "admin") {
          navigate("/admin_dashboard");
          toast.success("Login Successfull Admin Dashboard");
        } else if (role === "vendor") {
          navigate("/vendor_dashboard");
          toast.success("Login Successfull Vendor Dashboard");
        } else if (role === "client") {
          navigate("/");
          toast.success("Login Successfull Client Dashboard");
        } else {
          navigate("/login");
          toast.error("Invalid Credentials");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading && (
        <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-16 rounded-lg shadow-md w-full max-w-md relative"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // console.log(e.target.value);
            }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // console.log(e.target.value);
            }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
            {showPassword ? (
              <VisibilityIcon onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <VisibilityOffIcon
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <Button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Login
        </Button>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-500 hover:underline font-medium"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="text-blue-500 hover:underline font-medium"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
