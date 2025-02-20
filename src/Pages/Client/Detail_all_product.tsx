import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bookig_add_api } from "../../Components/api/Booking_Api";
import axios from "axios";

const Detail_all_product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]); // Track booked dates
  const [userBookedProducts, setUserBookedProducts] = useState<string[]>([]); // Store user booked products
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/property/get-product-bookings/${id}`
        );
        const dates = response.data.data.map(
          (dateString: string) => new Date(dateString)
        );
        setBookedDates(dates); // Booked dates ko state mein set karein
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [id]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:3000/api/v1/booking/get-user-booking",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const currentDate = new Date();
        const activeBooking = response.data.data.find(
          (booking: any) =>
            new Date(booking.bookingDate) >= currentDate &&
            booking.productId === id
        );

        if (activeBooking) {
          setBookingStatus(activeBooking.status); // Set booking status
          if (activeBooking.status === "approved") {
            setStartDate(new Date(activeBooking.bookingDate));
          }
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [id]);

  useEffect(() => {
    if (id) {
      getDetailProduct(id)
        .then((res) => {
          setProduct(res?.data.data);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }, [id]);

  const addBooking = () => {
    if (startDate && id) {
      const bookingDate = startDate.toISOString();
      Bookig_add_api(bookingDate, id)
        .then((res) => {
          console.log(res);
          navigate(`/luxury-villa/${id}/booking-update`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(
        "Please select a booking date and ensure productId is available."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product Details</h1>

      {product ? (
        <div>
          <div className="flex justify-center mb-6">
            <img
              src={product.pics[0]}
              alt={product.name}
              className="w-full max-w-xl h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.pics.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold">Price:</span>
              <span className="text-lg text-green-600">${product.price}</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold">Location:</span>
              <span className="text-lg">{product.location}</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold">Type:</span>
              <span className="text-lg">{product.type}</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold">Available:</span>
              <span className="text-lg text-green-600">
                {product.available ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="booking-date"
              className="block text-lg font-semibold mb-2"
            >
              Choose a booking date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={startDate}
              placeholderText="Start Date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              minDate={new Date()}
              excludeDates={bookedDates} // Disable booked dates
            />
          </div>

          <div className="mt-6 flex justify-center">
            {bookingStatus ? (
              <div>
                <p className="text-lg font-semibold">
                  Booking Status:{" "}
                  <span
                    className={`${
                      bookingStatus === "pending"
                        ? "text-yellow-500"
                        : bookingStatus === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {bookingStatus.toUpperCase()}
                  </span>
                </p>
                {bookingStatus === "approved" && startDate && (
                  <p className="mt-2 text-blue-600">
                    Booked Date: {startDate.toDateString()}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={addBooking}
                disabled={userBookedProducts.includes(id as string)}
                className={`px-6 py-3 ${
                  userBookedProducts.includes(id as string)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold rounded-lg shadow-lg transition`}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Loading product details...
        </p>
      )}
    </div>
  );
};

export default Detail_all_product;
