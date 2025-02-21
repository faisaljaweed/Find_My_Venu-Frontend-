import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { forgotPasswordApi } from "../Components/api/User_Api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e: any) => {
    e.preventDefault();

    forgotPasswordApi(email)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Password reset link sent to your email");
          navigate("/reset-password"); // Navigate to reset password screen
        }
      })
      .catch((err) => {
        toast.error("Failed to send password reset link");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
