import React, { useState } from "react";
import { Product } from "../../Components/Types/Product_types";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface FilteredCardProps {
  hasSearched: boolean;
  filteredProducts: Product[]; // Replace 'any[]' with the appropriate type if known
}

const FIltered_Card: React.FC<FilteredCardProps> = ({
  hasSearched,
  filteredProducts,
}) => {
  const [favourites, setFavourites] = useState<{ [key: string]: boolean }>({});
  const toggleFavourite = (productId: string) => {
    setFavourites((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle true/false
    }));
  };

  return (
    <div>
      {hasSearched && (
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-36 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredProducts.map((product) => (
                  <NavLink
                    to={`/luxury-villa/${product._id}`}
                    key={product._id}
                    className="group"
                  >
                    <div className="relative bg-white  overflow-hidden ">
                      {/* Image Section */}
                      <div className="relative h-64 w-full bg-gray-200 hover:scale-105 transition-transform duration-500">
                        <img
                          src={product.pics[0]}
                          alt={product.name}
                          className="w-full h-full object-cover "
                        />
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
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FIltered_Card;
