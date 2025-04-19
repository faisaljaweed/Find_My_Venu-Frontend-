import "react-datepicker/dist/react-datepicker.css";
import bg from "../../images/01.jpg";

const Home_Header = () => {
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

      {/* Member Info */}
      <div className="mt-6 max-w-4xl mx-auto  text-[#555555] p-4 rounded-md flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="flex items-center gap-2 text-md text-center md:text-left">
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
