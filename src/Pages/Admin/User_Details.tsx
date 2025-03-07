// // User_Details.tsx
// import { useEffect, useState } from "react";
// import { DeleteUser, getUser } from "../../Components/api/User_Api";
// import { User } from "../../Components/Types/User_types"; // Adjust the path as needed
// import SearchIcon from "@mui/icons-material/Search";
// const User_Details = () => {
//   // State variable to hold user data with proper type
//   const [userData, setUserData] = useState<User[]>([]);

//   // Handler for the "Get User" button click
//   useEffect(() => {
//     const handleGetUser = async () => {
//       try {
//         const res = await getUser();
//         console.log("API Response:", res.data.data);
//         // Adjust this according to your API response shape
//         setUserData(res.data.data || []);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     handleGetUser();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!id) {
//       console.error("User ID is undefined");
//       return;
//     }
//     try {
//       const res = await DeleteUser(id);
//       console.log(res);
//       // Optionally update the state to remove the deleted user from the UI:
//       setUserData((prevData) => prevData.filter((user) => user._id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
//           Check Booking Details
//         </h1>
//         <SearchIcon className="size-28 text-gray-400" aria-hidden="true" />
//         <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   UserName
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Verified
//                 </th> */}
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {userData.map((booking) => (
//                 <tr key={booking._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
//                     {booking.email || "N/A"}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
//                     {booking.username || "N/A"}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
//                     {booking.role || "N/A"}
//                   </td>
//                   {/* <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
//                     {booking.verified ? "Yes" : "No"}
//                   </td> */}
//                   <td className="px-4 py-2 text-sm text-gray-900">
//                     <button
//                       onClick={() => handleDelete(booking._id)}
//                       className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User_Details;

import { useEffect, useState } from "react";
import { DeleteUser, getUser } from "../../Components/api/User_Api";
import { User } from "../../Components/Types/User_types"; // Adjust the path as needed
import SearchIcon from "@mui/icons-material/Search";

const User_Details = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await getUser();
        console.log("API Response:", res.data.data);
        setUserData(res.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetUser();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const res = await DeleteUser(id);
      console.log(res);
      setUserData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = userData.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Check Booking Details
        </h1>
        <div className="mb-4 flex items-center bg-white shadow-md rounded-lg p-2">
          <SearchIcon className="text-gray-400 mr-2" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 outline-none"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UserName
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
                    {booking.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
                    {booking.username || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 break-words md:whitespace-nowrap">
                    {booking.role || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-3 py-1 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User_Details;
