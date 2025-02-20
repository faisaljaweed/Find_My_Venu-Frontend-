import DealSection1 from "../../images/DealSection-1-.jpg";
import DealSection2 from "../../images/DealSection-2-.jpg";
import DealSection3 from "../../images/DealSection-3-.jpg";
import DealSection4 from "../../images/DealSection-4-.jpg";
const deals = [
  {
    image: DealSection1, // Replace with actual image URL
    title: "Rajwada Desert Camp by Park Tree",
    location: "Sam",
    rating: "9.0",
    reviews: "2 reviews",
    price: "€182",
    oldPrice: "€450",
    perNight: "€91 per night",
  },
  {
    image: DealSection2,
    title: "Anaya Beacon Hotel, Jamnagar",
    location: "Jamnagar",
    rating: "9.2",
    reviews: "20 reviews",
    price: "€88",
    oldPrice: "€125",
    perNight: "€44 per night",
    discount: "30% off",
  },
  {
    image: DealSection3,
    title: "Anaya Beacon Hotel, Jamnagar",
    location: "Jamnagar",
    rating: "9.2",
    reviews: "20 reviews",
    price: "€88",
    oldPrice: "€125",
    perNight: "€44 per night",
    discount: "30% off",
  },
  {
    image: DealSection4,
    title: "Anaya Beacon Hotel, Jamnagar",
    location: "Jamnagar",
    rating: "9.2",
    reviews: "20 reviews",
    price: "€88",
    oldPrice: "€125",
    perNight: "€44 per night",
    discount: "30% off",
  },
];

const DealsSection = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">
        Top deals for a last minute getaway
      </h2>
      <p className="text-gray-600 mb-4">
        Showing deals for:{" "}
        <span className="font-semibold">22 Jan - 24 Jan</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{deal.title}</h3>
              <p className="text-gray-500 text-sm">{deal.location}</p>
              <p className="text-green-600 font-bold">
                {deal.rating}{" "}
                <span className="text-gray-600 font-normal">
                  Wonderful ({deal.reviews})
                </span>
              </p>
              <p className="text-lg font-bold">
                {deal.price}{" "}
                <span className="line-through text-gray-500 text-sm">
                  {deal.oldPrice}
                </span>
              </p>
              <p className="text-sm text-gray-600">{deal.perNight}</p>
              {deal.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">
                  {deal.discount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
