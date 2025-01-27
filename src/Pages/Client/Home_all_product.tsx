import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import Button from "../../Components/Button";
// import { useNavigate } from "react-router-dom";

const Home_all_product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const Navigate = useNavigate();
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
    <div className="container mx-auto md:px-36 mt-3">
      <div className="grid grid-cols-1 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Left: Image */}
            <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-100">
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg"
              />
            </div>

            {/* Right: Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
              <p className="text-gray-700 mb-3">{product.description}</p>
              <p className="text-gray-700 font-bold text-lg">
                Price: ${product.price}
              </p>
              <Button
                onClick={() => {
                  // Navigate(`/luxury-villa/${product._id}`);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home_all_product;
