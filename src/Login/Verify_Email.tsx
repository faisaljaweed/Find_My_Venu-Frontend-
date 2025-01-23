import { useEffect } from "react";
import { verifyEmailApi } from "../Components/api/User_Api";

const Verify_Email = () => {
  const emailToken = localStorage.getItem("emailToken");
  useEffect(() => {
    if (emailToken) {
      console.log(emailToken);
      verifyEmailApi(emailToken)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("No email token found");
    }
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p className="text-gray-700">
          Please check your email and click the verification link to activate
          your account.
        </p>
      </div>
    </div>
  );
};

export default Verify_Email;
