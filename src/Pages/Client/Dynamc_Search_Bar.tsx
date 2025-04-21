import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import { useNavigate } from "react-router-dom";

const Dynamc_Search_Bar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [, setFilteredProducts] = useState<Product[]>([]);
  const [, setHasSearched] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    let results = [...products];

    if (selectedType) {
      results = results.filter(
        (product) => product.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (guests) {
      results = results.filter(
        (product) => product.seatedCapacity >= parseInt(guests)
      );
    }
    navigate("global-search", {
      state: { filteredProducts: results, hasSearched: true },
    });

    setFilteredProducts(results);
  };

  return (
    <div className="p-4 md:p-14">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Type</option>
            <option value="farm house">Farm House</option>
            <option value="hall">Hall</option>
            <option value="banquet">Banquet</option>
            <option value="villas">Villas</option>
            <option value="murqee">Murqee</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm text-transparent mb-1">Search</label>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results Section */}
    </div>
  );
};

export default Dynamc_Search_Bar;
