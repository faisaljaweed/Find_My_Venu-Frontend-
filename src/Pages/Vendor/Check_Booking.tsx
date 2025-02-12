import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";

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

const thStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px",
};

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:3000/api/v1/booking/get-booking`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        // Maan lete hain ke API response kuch is tarah ka hai:
        // { statuscode: 200, message: "Bookings Fetched", data: [ ...booking objects... ], success: true }
        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = axios.delete(
        `http://localhost:3000/api/v1/booking/delete-booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
      console.log(response);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <Box p={2}>
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
        Check Booking
      </h1>

      <Box mt={2} sx={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>S.No</th>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Contact No</th>
              <th style={thStyle}>Booking Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td style={tdStyle} colSpan={4}>
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{booking._id}</td>
                  <td style={tdStyle}>{booking.clientId.username}</td>
                  <td style={tdStyle}>{booking.productId?.name || "Jake"}</td>
                  <td style={tdStyle}>{booking.contactNo}</td>
                  <td style={tdStyle}>{formatDate(booking.bookingDate)}</td>
                  <td style={tdStyle}>{booking.status}</td>
                  <td style={tdStyle}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleDelete(booking._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Check_Booking;
