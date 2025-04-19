import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
interface Booking {
  _id: string;
  clientId?: {
    username?: string;
  };
  productId?: {
    name?: string;
  };
  bookingDate: string;
  status: string;
}

const Check_Booking_Details = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const getBooking = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `https://venu-backend.vercel.app//api/v1/booking/get-booking-only-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data); // Assuming the response has a `data` field
        setLoading(false);
      } catch (error) {
        console.error(error);
        // setError("Failed to fetch bookings");
        setLoading(false);
      }
    };
    getBooking();
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(
        `https://venu-backend.vercel.app//api/v1/booking/delete-booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const filteredUsers = bookings.filter(
    (user) =>
      user.clientId?.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.productId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.bookingDate.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Client Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {booking.clientId?.username || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {booking.productId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
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

export default Check_Booking_Details;
