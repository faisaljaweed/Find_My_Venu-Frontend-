import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

const Detail_all_product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null); // Date state for the selected date

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

  // Function to handle booking action
  const handleBooking = () => {
    if (startDate && product) {
      alert(
        `You have booked the product "${
          product.name
        }" for ${startDate.toLocaleDateString()}`
      );
      // You can add further logic to save the booking details
    } else {
      alert("Please select a booking date.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Product Details</h1>

      {product ? (
        <div>
          {/* Main Image */}
          <div className="flex justify-center mb-6">
            <img
              src={product.pics[0]} // Assuming the first image is the main one
              alt={product.name}
              className="w-full max-w-xl h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Additional Images */}
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

          {/* Product Details */}
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

          {/* Booking Date Picker */}
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
              endDate={startDate} // You can adjust endDate logic if needed
              placeholderText="Start Date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              minDate={new Date()} // Disable past dates
            />
          </div>

          {/* Book Now Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleBooking}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
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
