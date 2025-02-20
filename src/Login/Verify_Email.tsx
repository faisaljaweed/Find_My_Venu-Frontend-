// import { useEffect } from "react";
// import { verifyEmailApi } from "../Components/api/User_Api";
// import { useLocation } from "react-router-dom";
// // import { toast } from "react-toastify";

// const Verify_Email = () => {
//   // const emailToken = localStorage.getItem("emailToken");
//   const location = useLocation();
//   const emailToken = location.state.emailToken;
//   useEffect(() => {
//     if (emailToken) {
//       console.log(emailToken);
//       verifyEmailApi(emailToken)
//         .then((res) => {
//           console.log(res);
//           // toast.success("Email Verified Successfully");
//         })
//         .catch((err) => {
//           console.log(err);
//           // toast.error("Email Verification Failed");
//         });
//     } else {
//       console.log("No email token found");
//     }
//   }, []);
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
//         <p className="text-gray-700">
//           Please check your email and click the verification link to activate
//           your account.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Verify_Email;

// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmailApi } from "../Components/api/User_Api";

const Verify_Email = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailToken = location.state?.emailToken;

  const handleVerify = () => {
    console.log("Verify Button Clicked!");
    if (!emailToken) {
      toast.error("Invalid or Expired Token");
      return;
    }

    verifyEmailApi(emailToken)
      .then((res) => {
        console.log("Response:", res);
        if (res?.status === 200) {
          toast.success("Email Verified Successfully");
          navigate("/login");
        } else {
          toast.error("Unexpected Response");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        toast.error("Email Verification Failed");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        <p className="text-gray-700 mb-4">
          Please check your email and click the verification link to activate
          your account.
        </p>
        <button
          onClick={handleVerify}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default Verify_Email;
