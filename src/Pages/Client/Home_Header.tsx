import "react-datepicker/dist/react-datepicker.css";
import bg from "../../images/01.jpg";
import Dynamc_Search_Bar from "./Dynamc_Search_Bar";

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
      <Dynamc_Search_Bar />
    </div>
  );
};

export default Home_Header;
