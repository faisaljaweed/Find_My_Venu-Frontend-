import RestaurantVenues from "./Deal_Section";
// import DealsSection from "./Deal_Section";
import Home_Card from "./Home_Card";
import Home_Header from "./Home_Header";
import Indoor from "./Indoor";

const Home = () => {
  return (
    <>
      {/* Home Header */}
      <Home_Header />
      {/* Home Card */}
      <Home_Card />
      {/* Indoor */}
      <Indoor />
      {/* Deal Section */}
      {/* <DealsSection /> */}
      <RestaurantVenues />
    </>
  );
};

export default Home;
