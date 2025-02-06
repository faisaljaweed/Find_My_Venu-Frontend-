import DealsSection from "./Deal_Section";
import Home_Card from "./Home_Card";
import Home_Header from "./Home_Header";

const Home = () => {
  return (
    <>
      {/* Home Header */}
      <Home_Header />
      {/* Home Card */}
      <Home_Card />
      {/* Deal Section */}
      <DealsSection />
    </>
  );
};

export default Home;
