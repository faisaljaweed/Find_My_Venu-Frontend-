import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/PicBg.png";
const Home_all_product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const Navigate = useNavigate();

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
    <div className="container mx-auto md:px-36 mt-5">
      <div className="grid grid-cols-1 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative flex flex-col md:flex-row bg-gray-200 shadow-md rounded-xl p-6 md:mt-16"
          >
            {/* Left: Image */}
            <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-100 rounded-lg">
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>

            {/* Right: Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {product.name}
              </h2>

              {/* Highlighted Price & Email */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${product.price}
                </span>
              </div>

              <p className="text-gray-700 mb-3">{product.description}</p>

              <Button
                onClick={() => {
                  Navigate(`/luxury-villa/${product._id}`);
                }}
                className="mt-3 bg-[#1e3a8a] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition"
              >
                Book Now
              </Button>
            </div>

            <div
              className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-36 h-36 md:w-60 md:h-60 bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home_all_product;
