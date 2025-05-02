import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Loader from "../../Components/Loader";

const Home_all_product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Something went wrong", err);
      });
  }, []);

  const toggleFavourite = (productId: string) => {
    setFavourites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const getFeaturedItems = () => products.slice(0, 2);
  const getRegularItems = () => products.slice(2);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 xl:px-36 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-3">
          Discover Amazing Places
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of villas, farmhouses, and banquets
          designed for your perfect event.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {loading && (
          <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
            <Loader />
          </div>
        )}
        {/* Featured Items */}
        {getFeaturedItems().map((product, index) => (
          <div
            key={product._id}
            className={`md:col-span-6 ${
              index === 0 ? "lg:col-span-8" : "lg:col-span-4"
            }`}
          >
            <NavLink
              to={`/luxury-villa/${product._id}`}
              className="block h-full group"
            >
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg bg-white">
                <img
                  src={product.pics[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 bg-black bg-opacity-60 rounded-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavourite(product._id);
                  }}
                >
                  {favourites[product._id] ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon className="text-white" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm line-clamp-1">{product.description}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}

        {/* Regular Items */}
        {getRegularItems().map((product) => (
          <div key={product._id} className="md:col-span-6 lg:col-span-4">
            <NavLink
              to={`/luxury-villa/${product._id}`}
              className="block h-full group"
            >
              <div className="relative h-72 rounded-xl overflow-hidden shadow-sm bg-white">
                <img
                  src={product.pics[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute bottom-3 right-3 flex items-center justify-center w-7 h-7 bg-black bg-opacity-60 rounded-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavourite(product._id);
                  }}
                >
                  {favourites[product._id] ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon className="text-white" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 text-white px-3 py-2">
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="text-xs line-clamp-1">{product.description}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home_all_product;
