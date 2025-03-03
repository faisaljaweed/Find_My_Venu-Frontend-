// import { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from "../../images/01.jpg";
// import Header from "../../Components/Header";
const Home_Header = () => {
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div
      className=" bg-cover bg-center bg-gray-100 min-h-screen p-6"
      style={{ backgroundImage: `url(${bg}) ` }}
    >
      {/* <Header /> */}
      {/* Header */}
      <div className="text-center mb-8 mt-32">
        <h1 className="text-4xl md:text-7xl font-bold text-[#555555]">
          Restaurant Venues in Karachi
        </h1>
      </div>

      {/* Search Bar */}
      {/* <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row bg-white rounded-md shadow-md p-4 gap-4 w-full max-w-4xl">
          <input
            type="text"
            placeholder="Where to?"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex-1">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              minDate={new Date()} // Disable past dates
            />
          </div>
          <div className="flex-1">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()} // Disable past dates and ensure end date is after start date
              placeholderText="End Date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="text"
            placeholder="2 travellers, 1 room"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition">
            Search
          </button>
        </div>
      </div> */}

      {/* Member Info */}
      <div className="mt-6 max-w-4xl mx-auto  text-[#555555] p-4 rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="flex items-center gap-2 text-md text-center md:text-left">
          {/* <span className="bg-yellow-400 text-black rounded-full p-2">
            <i className="fas fa-lock"></i>
          </span> */}
          Discover the best restaurant venues in Sydney to hire for dining and
          celebratory functions
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white text-[#555555] p-6 rounded-md flex items-center gap-4">
          <i className="fas fa-calendar-alt text-2xl"></i>
          <p>Earn rewards on every night you stay</p>
        </div>
        <div className="bg-white text-[#555555] p-6 rounded-md flex items-center gap-4">
          <i className="fas fa-tag text-2xl"></i>
          <p>Save more with Member Prices</p>
        </div>
        <div className="bg-white text-[#555555] p-6 rounded-md flex items-center gap-4">
          <i className="fas fa-clock text-2xl"></i>
          <p>Free cancellation options if plans change</p>
        </div>
      </div>
    </div>
  );
};

export default Home_Header;
