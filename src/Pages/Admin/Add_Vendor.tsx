import { useState } from "react";
import { Signup_api } from "../../Components/api/User_Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Add_Vendor = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("vendor");

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    const userData = {
      username,
      email,
      password,
      confirmPassword,
      role,
    };

    Signup_api(userData)
      .then((res) => {
        const emailToken = res?.data?.data?.loggedInUser.emailToken;
        console.log(`Email Token is ${emailToken}`);
        // if (emailToken) {
        //   localStorage.setItem("emailToken", emailToken);
        // }
        console.log(res);
        if (res?.status === 200) {
          navigate(`/verify-email/${emailToken}`, {
            state: { emailToken: emailToken },
          });
          console.log("Email Token", emailToken);
          toast.success("Signup Successfull");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Signup Failed");
      });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Vendor
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="vendor_name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="vendor_name"
                name="vendor_name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="vendor_email"
                name="vendor_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="vendor_phone"
                name="vendor_phone"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_address"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="vendor_address"
                name="vendor_address"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <input
              type="hidden"
              id="role"
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Vendor
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
