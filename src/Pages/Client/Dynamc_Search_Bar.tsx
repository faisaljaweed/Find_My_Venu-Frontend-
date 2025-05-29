import { useEffect, useState } from "react";
import { getAllProducts } from "../../Components/api/Product_Api";
import { Product } from "../../Components/Types/Product_types";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Loader from "../../Components/Loader";
const Dynamc_Search_Bar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [, setFilteredProducts] = useState<Product[]>([]);
  const [, setHasSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    // <div className="p-4 md:p-14">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row"
    //   >
    //     <div className="flex-shrink-0 p-2 grid md:grid-cols-3 gap-2">
    //       <select
    //         value={selectedType}
    //         onChange={(e) => setSelectedType(e.target.value)}
    //         className="py-3 px-4 rounded-md border-gray-300 focus:ring-amber-500 focus:border-amber-500"
    //       >
    //         <option value="">Select Type</option>
    //         <option value="farm house">Farm House</option>
    //         <option value="hall">Hall</option>
    //         <option value="banquet">Banquet</option>
    //         <option value="villas">Villas</option>
    //         <option value="murqee">Murqee</option>
    //       </select>
    //     </div>
    //     <div className="flex-grow p-2 md:mr-2">
    //       <div className="relative">
    //         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //           <Search size={20} className="text-gray-400" />
    //         </div>
    //         <input
    //           type="number"
    //           min="1"
    //           placeholder="Enter Guests"
    //           value={guests}
    //           onChange={(e) => setGuests(e.target.value)}
    //           className="w-full pl-10 pr-4 py-3 rounded-md border-gray-300 focus:ring-amber-500 focus:border-amber-500"
    //         />
    //       </div>
    //     </div>

    //     <div className="w-full md:w-auto">
    //       <label className="block text-sm text-transparent mb-1">Search</label>
    //       <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
    //         Search
    //       </button>
    //     </div>
    //   </form>

    //   {/* Results Section */}
    // </div>

    <div className="p-4 md:p-10">
      {loading && (
        <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl px-6 py-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        {/* Type Selection */}
        <div className="w-full md:w-1/3">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Select Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full py-3 px-4 rounded-md border border-gray-300 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Choose</option>
            <option value="farm house">Farm House</option>
            <option value="hall">Hall</option>
            <option value="banquet">Banquet</option>
            <option value="villas">Villas</option>
            <option value="murqee">Murqee</option>
          </select>
        </div>

        {/* Guest Input */}
        <div className="w-full md:w-1/3">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Number of Guests
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="number"
              min="1"
              placeholder="Enter Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto">
          <label className="block mb-1 text-sm text-transparent">Search</label>
          <button className="w-full bg-[#d97706] hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dynamc_Search_Bar;
{
  /* <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row">
            <div className="flex-grow p-2 md:mr-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for location, property type, or features"
                  className="w-full pl-10 pr-4 py-3 rounded-md border-gray-300 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex-shrink-0 p-2 grid md:grid-cols-3 gap-2">
              <select className="py-3 px-4 rounded-md border-gray-300 focus:ring-amber-500 focus:border-amber-500">
                <option value="">Property Type</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="penthouse">Penthouse</option>
              </select>

              <select className="py-3 px-4 rounded-md border-gray-300 focus:ring-amber-500 focus:border-amber-500">
                <option value="">Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>

              <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Search
              </button>
            </div>
          </div> */
}
