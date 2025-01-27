import { Link } from "react-router-dom";
import img1 from "../../images/Hotel.avif";
import img2 from "../../images//farm_house.webp";
import img3 from "../../images/premium_photo-1680300960892-bd11b59b469b.avif";

const Home_Card = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">
        2X Points on Home Rentals
      </h1>
      <p className="text-center text-gray-600 mt-2">
        More Space, More Privacy, More Points with Every Vacation Home Rental
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <Link to="/luxury-villa" className="group">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={img1}
              alt="Luxury Villa"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <h2 className="text-white text-lg font-bold">Luxury Villa</h2>
              <p className="text-gray-300 text-sm">
                Experience unprecedented luxury in our carefully curated villas
              </p>
            </div>
          </div>
        </Link>
        <Link to="/luxury-villa" className="group">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={img2}
              alt="Banquet & Hotel"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <h2 className="text-white text-lg font-bold">Banquet & Hotel</h2>
              <p className="text-gray-300 text-sm">
                Wake up to stunning ocean views and pristine beaches
              </p>
            </div>
          </div>
        </Link>
        <Link to="/luxury-villa" className="group">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              src={img3}
              alt="Farm House"
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
              <h2 className="text-white text-lg font-bold">Farm House</h2>
              <p className="text-gray-300 text-sm">
                Escape to serenity in our mountain-view properties
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home_Card;
