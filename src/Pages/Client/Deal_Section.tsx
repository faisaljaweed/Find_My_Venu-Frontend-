import React from "react";

const RestaurantVenues: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-16 items-center p-4">
        {/* Left Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl text-center md:text-left border-2 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Pakistan FarmHouse Venues</h2>
          <p className="text-gray-600 mb-4">
            Karachi is a haven for those seeking serene escapes, and many
            farmhouses are renowned for their spacious settings and scenic
            beauty. Some farmhouses offer luxurious amenities and collaborate
            with event planners to provide a memorable experience that elevates
            any gathering. Whether it’s a family picnic, a corporate retreat, or
            a wedding celebration, Karachi’s farmhouses add a charming and
            tranquil dimension to venue hire.
          </p>
          <p className="text-gray-600">
            Karachi is a haven for those seeking serene escapes, and many
            farmhouses are renowned for their spacious settings and scenic
            beauty. Some farmhouses offer luxurious amenities and collaborate
            with event planners to provide a memorable experience that elevates
            any gathering. Whether it’s a family picnic, a corporate retreat, or
            a wedding celebration, Karachi’s farmhouses add a charming and
            tranquil dimension to venue hire.
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
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Let's Find Your Dream Home
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Work with our expert team to find the perfect property that meets
            all your needs
          </p>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors">
              Browse Properties
            </button>
            <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white font-medium rounded-md transition-colors">
              Contact an Agent
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default RestaurantVenues;
