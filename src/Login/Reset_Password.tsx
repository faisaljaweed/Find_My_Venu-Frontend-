import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
// import { ResetPassword_api } from "../Components/api/User_Api";

const Reset_Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // ResetPassword_api({ newPassword, confirmPassword })
    //   .then((res) => {
    //     toast.success("Password reset successfully");
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to reset password");
    //     console.log(err);
    //   });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <Button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default Reset_Password;
