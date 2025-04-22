import Home_all_product from "./Home_all_product";

const Home_Card = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 font-serif mb-4">
        Best Farm House Venues in Karachi
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
        For private or corporate functions alike, karachi offers some amazing
        farm_house venues for a birthday party, a business luncheon, a bridal
        shower or end of year celebration with your team. With catering provided
        on site and the option to customise function packages to suit your
        budget and style of event, restaurants are an ideal choice for many.
        With a gentle energy the bustle of a restaurant adds to the ambience of
        a function with many offering a private dining room or shared function
        area to celebrate your occasion.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"></div>
      <Home_all_product />
    </div>
  );
};

export default Home_Card;
