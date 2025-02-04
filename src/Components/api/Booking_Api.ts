import axios from "axios";

export const Bookig_add_api = async (
  bookingDate: string,
  productId: string
) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(
      `http://localhost:3000/api/v1/booking/add-booking`,
      {
        bookingDate,
        productId,
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
    let accessToken = localStorage.getItem("accessToken");
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
    let accessToken = localStorage.getItem("accessToken");
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
