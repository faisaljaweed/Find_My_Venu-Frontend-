import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import { Vendor_Bookig_add_api } from "../../Components/api/Booking_Api";
import DatePicker from "react-datepicker";
import axios from "axios";

const Add_Booking = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bookingDate, setBookingDate] = useState<string>(""); // Booking date
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  // Form State to add Booking
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalGuest, settotalGuest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  // Fetch all products when the component mounts

  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentVendorId = currentUser ? currentUser._id : null;

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        let allProducts: Product[] = res.data;

        // Sirf current vendor ke products filter karein
        if (currentVendorId) {
          allProducts = allProducts.filter(
            (product) => product.vendorId === currentVendorId
          );
        }

        allProducts.map((product) => {
          product._id;
        });
        setProducts(allProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch Booked Dates

  // Handle form submission
  const addBooking = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await Vendor_Bookig_add_api(
        bookingDate,
        selectedProduct,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email
      );
      console.log("Booking response:", res);
      // Optionally, add logic here to show a success message or clear the form
    } catch (err) {
      console.log("Error during booking:", err);
    }
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `https://venu-backend.vercel.app//api/v1/property/get-product-bookings/${selectedProduct}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        const dates = response.data.data.map(
          (dateString: string) => new Date(dateString)
        );
        setBookedDates(dates); // Booked dates ko state mein set karein
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [selectedProduct]);

  return (
    <>
      <div className="max-w-[500px] mx-auto p-3 mt-5 border border-gray-300 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Add Booking
        </h1>
        <form className="space-y-4 mt-4 " onSubmit={addBooking}>
          <select
            className="w-full border-[1.5px] border-black rounded-lg p-2"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option>Select</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-[1.5px] border-black rounded-lg p-2"
            required
          />
          <div className="flex items-center  border-[1.5px] border-black rounded-lg p-2">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => {
                setStartDate(date);
                setBookingDate(date ? date.toISOString() : "");
              }}
              selectsStart
              startDate={startDate}
              endDate={startDate}
              placeholderText="Start Date"
              className="w-full outline-none "
              minDate={new Date()}
              excludeDates={bookedDates} // Disable booked dates
            />
          </div>
          <div className="flex gap-2">
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-lg p-2 border-[1.5px] border-black"
              required
            >
              <option>Starts</option>
              <option value={"01:00 am"}>01:00 am</option>
              <option value={"01:30 am"}>01:30 am</option>
              <option value={"02:00 am"}>02:00 am</option>
              <option value={"02:30 am"}>02:30 am</option>
              <option value={"03:00 am"}>03:00 am</option>
              <option value={"03:30 am"}>03:30 am</option>
              <option value={"04:00 am"}>04:00 am</option>
              <option value={"04:30 am"}>04:30 am</option>
              <option value={"05:00 am"}>05:00 am</option>
              <option value={"05:30 am"}>05:30 am</option>
              <option value={"06:00 am"}>06:00 am</option>
              <option value={"06:30 am"}>06:30 am</option>
              <option value={"07:00 am"}>07:00 am</option>
              <option value={"07:30 am"}>07:30 am</option>
              <option value={"08:00 am"}>08:00 am</option>
              <option value={"08:30 am"}>08:30 am</option>
              <option value={"09:00 am"}>09:00 am</option>
              <option value={"09:30 am"}>09:30 am</option>
              <option value={"10:00 am"}>10:00 am</option>
              <option value={"10:30 am"}>10:30 am</option>
              <option value={"11:00 am"}>11:00 am</option>
              <option value={"11:30 am"}>11:30 am</option>
              <option value={"12:00 am"}>12:00 am</option>
            </select>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border-[1.5px] border-black rounded-lg p-2"
              required
            >
              <option>Ends</option>
              <option value={"01:00 am"}>01:00 am</option>
              <option value={"01:30 am"}>01:30 am</option>
              <option value={"02:00 am"}>02:00 am</option>
              <option value={"02:30 am"}>02:30 am</option>
              <option value={"03:00 am"}>03:00 am</option>
              <option value={"03:30 am"}>03:30 am</option>
              <option value={"04:00 am"}>04:00 am</option>
              <option value={"04:30 am"}>04:30 am</option>
              <option value={"05:00 am"}>05:00 am</option>
              <option value={"05:30 am"}>05:30 am</option>
              <option value={"06:00 am"}>06:00 am</option>
              <option value={"06:30 am"}>06:30 am</option>
              <option value={"07:00 am"}>07:00 am</option>
              <option value={"07:30 am"}>07:30 am</option>
              <option value={"08:00 am"}>08:00 am</option>
              <option value={"08:30 am"}>08:30 am</option>
              <option value={"09:00 am"}>09:00 am</option>
              <option value={"09:30 am"}>09:30 am</option>
              <option value={"10:00 am"}>10:00 am</option>
              <option value={"10:30 am"}>10:30 am</option>
              <option value={"11:00 am"}>11:00 am</option>
              <option value={"11:30 am"}>11:30 am</option>
              <option value={"12:00 am"}>12:00 am</option>
            </select>
          </div>
          <div className="flex items-center border-[1.5px] border-black rounded-lg p-2">
            <input
              type="number"
              placeholder="totalGuest"
              value={totalGuest}
              onChange={(e) => settotalGuest(e.target.value)}
              className="w-full outline-none"
              required
            />
          </div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-[1.5px] border-black rounded-lg p-2"
            required
          ></textarea>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-[1.5px] border-black rounded-lg p-2"
            required
          />

          <div className="mt-6 flex justify-center">
            <button className=" px-6 py-3 w-full bg-[#4f46e5] text-white rounded-lg font-bold hover:bg-pink-600">
              Book Now
            </button>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © Venue Will Respond Shortly
          </p>
        </form>
      </div>
    </>
  );
};

export default Add_Booking;
