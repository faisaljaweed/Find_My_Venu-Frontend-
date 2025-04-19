import React from "react";

const RestaurantVenues: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-16 items-center p-4">
      {/* Left Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl text-center md:text-left border-2 border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Pakistan FarmHouse Venues</h2>
        <p className="text-gray-600 mb-4">
          Karachi is a haven for those seeking serene escapes, and many
          farmhouses are renowned for their spacious settings and scenic beauty.
          Some farmhouses offer luxurious amenities and collaborate with event
          planners to provide a memorable experience that elevates any
          gathering. Whether it’s a family picnic, a corporate retreat, or a
          wedding celebration, Karachi’s farmhouses add a charming and tranquil
          dimension to venue hire.
        </p>
        <p className="text-gray-600">
          Karachi is a haven for those seeking serene escapes, and many
          farmhouses are renowned for their spacious settings and scenic beauty.
          Some farmhouses offer luxurious amenities and collaborate with event
          planners to provide a memorable experience that elevates any
          gathering. Whether it’s a family picnic, a corporate retreat, or a
          wedding celebration, Karachi’s farmhouses add a charming and tranquil
          dimension to venue hire.
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-80 text-center border-2 border-gray-300">
        <h3 className="text-xl font-bold mb-4">City Farm House Venues</h3>
        <button className="w-full bg-white border-2 border-gray-300 rounded-lg py-2 mb-3 hover:bg-gray-100">
          Farm House Venues in Karchi
        </button>
        <button className="w-full bg-white border-2 border-gray-300 rounded-lg py-2 mb-3 hover:bg-gray-100">
          Farm House Venues in Lahore
        </button>
        <button className="w-full bg-white border-2 border-gray-300 rounded-lg py-2 hover:bg-gray-100">
          Farm House Venues in Islamabad
        </button>
      </div>
    </div>
  );
};

export default RestaurantVenues;
