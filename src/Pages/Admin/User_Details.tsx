// User_Details.tsx
import { useEffect, useState } from "react";
import { DeleteUser, getUser } from "../../Components/api/User_Api";
import { User } from "../../Components/Types/User_types"; // Adjust the path as needed

const User_Details = () => {
  // State variable to hold user data with proper type
  const [userData, setUserData] = useState<User[]>([]);

  // Handler for the "Get User" button click
  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const res = await getUser();
        console.log("API Response:", res.data.data);
        // Adjust this according to your API response shape
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
      // Optionally update the state to remove the deleted user from the UI:
      setUserData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Check Booking Details
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  UserName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.email || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.username || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.role || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.verified || "N/A"}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-red-800"
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
