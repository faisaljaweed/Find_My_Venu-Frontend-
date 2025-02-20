// import React, { useState } from "react";
// import axios from "axios";
// import { Button, TextField, Box, Typography } from "@mui/material";

// const BookingResponse: React.FC = () => {
//   // State variables
//   const [bookingId, setBookingId] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Function to handle the API call with given action ('approved' or 'rejected')
//   const handleResponse = async (actionType: "approved" | "rejected") => {
//     // Clear previous messages
//     setMessage("");
//     setError("");

//     // Basic validation: ensure bookingId is provided
//     if (!bookingId) {
//       setError("Please enter Booking ID");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/booking/response-booking",
//         { BookingId: bookingId, action: actionType },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Assuming response.data.success indicates success
//       if (response.data.success) {
//         setMessage("Booking updated successfully!");
//       } else {
//         setError("Failed to update booking");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Respond to Booking
//       </Typography>
//       <Box
//         component="form"
//         sx={{
//           maxWidth: 400,
//           mx: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <TextField
//           label="Booking ID"
//           variant="outlined"
//           fullWidth
//           value={bookingId}
//           onChange={(e) => setBookingId(e.target.value)}
//           required
//         />
//         <Box display="flex" justifyContent="space-between">
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => handleResponse("approved")}
//           >
//             Approve
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => handleResponse("rejected")}
//           >
//             Reject
//           </Button>
//         </Box>
//         {message && (
//           <Typography variant="body1" color="green">
//             {message}
//           </Typography>
//         )}
//         {error && (
//           <Typography variant="body1" color="red">
//             {error}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default BookingResponse;
