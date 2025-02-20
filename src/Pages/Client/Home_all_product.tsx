// import { useEffect, useState } from "react";
// import { getAllProducts } from "../../Components/api/Product_Api";
// import { Product } from "../../Components/Types/Product_types";
// import Button from "../../Components/Button";
// import { useNavigate } from "react-router-dom";
// import img1 from "../../images/PicBg.png";
// const Home_all_product = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const Navigate = useNavigate();

//   useEffect(() => {
//     getAllProducts()
//       .then((res) => {
//         setProducts(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log("Something went wrong", err);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto md:px-36 mt-5">
//       <div className="grid grid-cols-1 gap-6">
//         {products.map((product, index) => (
//           <div
//             key={index}
//             className="relative flex flex-col md:flex-row bg-gray-200 shadow-md rounded-xl p-6 md:mt-16"
//           >
//             {/* Left: Image */}
//             <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-100 rounded-lg">
//               <img
//                 src={product.pics[0]}
//                 alt={product.name}
//                 className="w-full h-56 object-cover rounded-lg"
//               />
//             </div>

//             {/* Right: Content */}
//             <div className="md:w-2/3 p-6 flex flex-col justify-center">
//               <h2 className="text-2xl font-bold mb-2 text-gray-900">
//                 {product.name}
//               </h2>

//               {/* Highlighted Price & Email */}
//               <div className="flex items-center space-x-2 mb-2">
//                 <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   ${product.price}
//                 </span>
//               </div>

//               <p className="text-gray-700 mb-3">{product.description}</p>

//               <Button
//                 onClick={() => {
//                   Navigate(`/luxury-villa/${product._id}`);
//                 }}
//                 className="mt-3 bg-[#1e3a8a] text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-orange-600 transition"
//               >
//                 Book Now
//               </Button>
//             </div>

//             <div
//               className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-36 h-36 md:w-60 md:h-60 bg-no-repeat bg-cover"
//               style={{ backgroundImage: `url(${img1})` }}
//             ></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home_all_product;

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
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 mt-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 uppercase tracking-wide">
        Explore Our Luxury Villas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl"
          >
            {/* Image Section */}
            <div className="relative h-64 w-full bg-gray-200">
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>
              <p className="text-gray-700 mb-6 line-clamp-3">
                {product.description}
              </p>
              <Button
                onClick={() => {
                  Navigate(`/luxury-villa/${product._id}`);
                }}
                className="mt-auto bg-[#1e3a8a] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
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
