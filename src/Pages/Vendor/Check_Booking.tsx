import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Modal,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import Loader from "../../Components/Loader";

// Client aur Product ke details ke liye interfaces
interface Client {
  _id: string;
  username: string;
}

interface Product {
  _id: string;
  name: string;
}

// Booking interface jisme populated client aur product details honge
interface Booking {
  _id: string;
  clientId: Client;
  productId: Product;
  contactNo: string;
  bookingDate: string; // ISO date string ya jo bhi format API se mile
  status: string;
}
// Helper function to format date in "22-Jan-2000" format
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const Check_Booking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/booking/get-booking`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setBookings(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setStatus(booking.status);
    setModalOpen(true);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:3000/api/v1/booking/update-booking/${selectedBooking._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the booking status in the state
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBooking._id ? { ...booking, status } : booking
        );
        setBookings(updatedBookings);

        // If status is "rejected", delete the booking
        if (status === "rejected") {
          handleDelete(selectedBooking._id);
        }

        setModalOpen(false); // Close the modal
        setLoading(false);
      }
    } catch (error) {
      console.log("Error updating status:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `http://localhost:3000/api/v1/booking/delete-booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
      setLoading(false);
    } catch (error) {
      console.log("Error deleting booking:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Check Booking
        </h1>
        {loading && (
          <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
            <Loader />
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
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
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {booking._id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {booking.clientId?.username || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {booking.productId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDate(booking.bookingDate)}
                  </td>
                  <td className="px-4 py-4">
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
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-red-800 hover:bg-yellow-200 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", // 90% for mobile screens
            maxWidth: 400, // Max width for larger screens
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 id="modal-modal-title">Update Booking Status</h2>
          <Select
            value={status}
            onChange={handleStatusChange}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateStatus}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Check_Booking;
