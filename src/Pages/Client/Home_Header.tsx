import React from "react";
import CountUp from "react-countup";
import Dynamc_Search_Bar from "./Dynamc_Search_Bar";

const Home_Header: React.FC = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
          alt="Luxury Home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8 lg:px-16 xl:px-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 leading-tight">
            Dream Venues <span className="text-amber-400">in Pakistan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Explore our exclusive collection of luxury, Benquet, Farm House,
            properties around the pakistan curated for discerning buyers and
            investors.
          </p>

          {/* Search Bar */}
          <Dynamc_Search_Bar />
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36">
          <div className="grid grid-cols-2 md:grid-cols-4 py-4 border-t border-white/20">
            <div className="text-center p-4">
              <p className="text-amber-400 text-2xl md:text-3xl font-bold">
                <CountUp end={700} duration={2} separator="," />+
              </p>
              <p className="text-white text-sm">Properties</p>
            </div>
            <div className="text-center p-4">
              <p className="text-amber-400 text-2xl md:text-3xl font-bold">
                <CountUp end={35} duration={2} />+
              </p>
              <p className="text-white text-sm">Happy Clients</p>
            </div>
            <div className="text-center p-4">
              <p className="text-amber-400 text-2xl md:text-3xl font-bold">
                <CountUp end={35} duration={2} />+
              </p>
              <p className="text-white text-sm">Countries</p>
            </div>
            <div className="text-center p-4">
              <p className="text-amber-400 text-2xl md:text-3xl font-bold">
                <CountUp end={35} duration={1} />+
              </p>
              <p className="text-white text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home_Header;
