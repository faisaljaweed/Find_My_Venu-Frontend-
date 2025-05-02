import axios from "axios";

export const Bookig_add_api = async (
  bookingDate: string,
  productId: string,
  name: string,
  startTime: string,
  endTime: string,
  totalGuest: string,
  message: string,
  email: string
) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `http://localhost:3000/api/v1/booking/add-booking`,
      {
        bookingDate,
        productId,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Booking Error", error);
  }
};

// Vendor Bookng Api
export const Vendor_Bookig_add_api = async (
  bookingDate: string,
  productId: string,
  name: string,
  startTime: string,
  endTime: string,
  totalGuest: string,
  message: string,
  email: string
) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `http://localhost:3000/api/v1/booking/add-bookings`,
      {
        bookingDate,
        productId,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Booking Error", error);
  }
};
export const Bookig_update_api = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.put(
      `http://localhost:3000/api/v1/booking/update-booking${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Booking Error", error);
  }
};

export const getSpecificBooking = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://localhost:3000/api/v1/booking/get-specific-booking/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Booking Error", error);
  }
};

export const getBooking = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = axios.get(
      `http://localhost:3000/api/v1/booking/get-all-booking`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Booking Error", error);
  }
};
