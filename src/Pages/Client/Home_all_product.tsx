import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
// import Button from "../../Components/Button";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import img1 from "../../images/PicBg.png";

const Home_all_product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const Navigate = useNavigate();
  const [favourites, setFavourites] = useState<{ [key: string]: boolean }>({});

  const toggleFavourite = (productId: string) => {
    setFavourites((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle true/false
    }));
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 mt-8">
      {/* <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 uppercase tracking-wide">
        Explore Our Luxury Villas
      </h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, index) => (
          <NavLink
            to={`/luxury-villa/${product._id}`}
            key={product._id}
            className="group"
          >
            <div key={index} className="relative bg-white  overflow-hidden ">
              {/* Image Section */}
              <div className="relative h-64 w-full bg-gray-200 hover:scale-105 transition-transform duration-500">
                <img
                  src={product.pics[0]}
                  alt={product.name}
                  className="w-full h-full object-cover "
                />
                {/* <div className="absolute bottom-4 right-4 bg-black opacity-50 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"> */}
                {/* <span className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"> */}
                {/* ${product.price} */}
                {/* </span> */}
                {/* <FavoriteBorderIcon /> */}
                {/* </div> */}
                <div
                  className="absolute bottom-4 right-4 flex items-center justify-center w-7 h-7 bg-[#050202] rounded-full cursor-pointer shadow-md"
                  onClick={(e) => {
                    e.preventDefault(); // NavLink ko prevent karein
                    toggleFavourite(product._id);
                  }}
                >
                  {favourites[product._id] ? (
                    <FavoriteIcon className="text-red-500 " /> // Filled heart
                  ) : (
                    <FavoriteBorderIcon className="text-white " /> // Outline heart
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col">
                <h2 className="text-sm font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>
                <p className="text-gray-700 text-xs mb-6 line-clamp-1">
                  {product.description}
                </p>
                {/* <Button
                  onClick={() => {
                    Navigate(`/luxury-villa/${product._id}`);
                  }}
                  className="mt-auto bg-[#1e3a8a] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
                >
                  Book Now
                </Button> */}
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Home_all_product;
