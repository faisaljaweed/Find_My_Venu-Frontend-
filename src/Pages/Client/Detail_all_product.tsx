import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetailProduct } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Bookig_add_api } from "../../Components/api/Booking_Api";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllProducts } from "../../Components/api/Product_Api";
import {
  MapPin,
  Home,
  Users,
  CarFront as ChairFront,
  DotSquare as SquareFootage,
  Calendar,
  Clock,
  Utensils,
  Music,
  Camera,
} from "lucide-react";
const Detail_all_product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]); // Track booked dates
  const [userBookedProducts] = useState<string[]>([]); // Store user booked products
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Form to add booking
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalGuest, settotalGuest] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showAll, setShowAll] = useState(false);
  // Function to open the image in full screen

  // Gallery Image
  const [products, setProducts] = useState<Product[]>([]);
  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageOpen(true);
  };

  // Function to close the image
  const closeImage = () => {
    setIsImageOpen(false);
    setSelectedImage("");
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `https://venu-backend.vercel.app/api/v1/property/get-product-bookings/${id}`,
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
  }, [id]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://venu-backend.vercel.app/api/v1/booking/get-user-booking",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const currentDate = new Date();
        const activeBooking = response.data.data.find(
          (booking: {
            bookingDate: string;
            productId: string;
            status: string;
          }) =>
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
          console.log(res?.data.data);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    }
  }, [id]);

  const addBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && id) {
      const bookingDate = startDate.toISOString();
      Bookig_add_api(
        bookingDate,
        id,
        name,
        startTime,
        endTime,
        totalGuest,
        message,
        email
      )
        .then((res) => {
          console.log(res);
          if (res && res.status === 200) {
            toast.success("Booking request sent successfully!");
          } else {
            toast.error("Please login to book this product.");
          }
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

  // get ALl Products
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4">
      {product ? (
        <div>
          <div className="relative w-full">
            {/* Full Width Top Image with Overlay (optional) */}
            <div className="relative w-full h-[400px] mb-6">
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
                onClick={() => openImage(product.pics[0])}
              />
              {/* Optional Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10 rounded-lg"></div>
            </div>

            {/* Thumbnail Images Below */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.pics.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-36 object-cover rounded-md shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openImage(image)}
                />
              ))}
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/* image large */}
          {/* <div className="flex mb-6">
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full max-w-xl h-auto rounded-lg shadow-lg"
                onClick={() => openImage(product.pics[0])}
              />
            </div> */}
          {/* multiple images */}
          {/* <div className="grid grid-cols-3 gap-4 mb-6 mt-3">
              {product.pics.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => openImage(image)}
                />
              ))}
            </div>
          </div> */}
          {/* Venu Name and address */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{product.location}</span>
            </div>
          </div>
          {/* venu Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <Home size={24} className="text-indigo-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-500">Venue Type</h3>
              <p className="text-lg font-bold uppercase">{product.type}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <Users size={24} className="text-indigo-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-500">Standing</h3>
              <p className="text-lg font-bold">{product.standingCapacity}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <ChairFront size={24} className="text-indigo-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-500">Seated</h3>
              <p className="text-lg font-bold">{product.seatedCapacity}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <SquareFootage size={24} className="text-indigo-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-500">Size (Sqm)</h3>
              <p className="text-lg font-bold">{product.size}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Venu Description */}
            <div className="space-y-4 w-1/2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Venue
                </h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
              </div>
            </div>
            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
              <div className="bg-[#4f46e5] text-white items-center text-center h-14 py-2 rounded-t-2xl font-bold">
                Book Now
              </div>
              <form className="space-y-4 mt-4 " onSubmit={addBooking}>
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
                    onChange={(date: Date | null) => setStartDate(date)}
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
                      disabled={userBookedProducts.includes(id as string)}
                      className={`px-6 py-3 ${
                        userBookedProducts.includes(id as string)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "w-full bg-[#4f46e5] text-white py-2 rounded-lg font-bold hover:bg-pink-600"
                      } text-white font-semibold rounded-lg shadow-lg transition`}
                    >
                      Book Now
                    </button>
                  )}
                </div>
                <p className="text-center text-gray-500 text-sm">
                  © Venue Will Respond Shortly
                </p>
              </form>
            </div>
          </div>

          {/* Venu Feature */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Venue Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Calendar size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Event Planning</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Utensils size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Catering Available</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Music size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Sound System</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Clock size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Flexible Hours</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Camera size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Photography Spots</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <Users size={20} className="text-indigo-600 mr-3" />
                <span className="text-gray-700">Private Events</span>
              </div>
            </div>
          </div>

          {/* Gallery  */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {products
                .slice(0, showAll ? products.length : 2)
                .map((product, index) => (
                  <NavLink
                    to={`/luxury-villa/${product._id}`}
                    key={product._id}
                    className="group"
                    onClick={() => {
                      // Smooth Scroll और Force Refresh
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      // Optional: Force Reload
                      // window.location.reload();
                    }}
                  >
                    <div
                      key={index}
                      className="relative bg-white  overflow-hidden "
                    >
                      {/* Image Section */}
                      <div className="relative h-64 w-full bg-gray-200 hover:scale-105 transition-transform duration-500">
                        <img
                          src={product.pics[0]}
                          alt={product.name}
                          className="w-full h-full object-cover "
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">
                          {product.name}
                        </h2>
                        <p className="text-gray-700 text-xs mb-6 line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
            {products.length > 2 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mx-auto block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {showAll ? "Show Less" : "View All"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Loading product details...
        </p>
      )}
      {isImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <img
            src={selectedImage}
            alt="Full Screen"
            className="max-w-full max-h-full"
          />
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-4xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Detail_all_product;
