import React, { useEffect, useState } from "react";
import axios from "axios";

// Product interface define karte hain
interface Product {
  _id: string;
  name: string;
  description: string;
  pics: string[];
  location: string;
  type: string;
  price: number;
  availableDates: string[]; // ya Date[] (backend se jo format mile)
  vendorId: string;
}

const Booking_Detail: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Modal state aur selected product state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form data state for editing product
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "",
    price: "",
    availableDates: "",
  });

  // Logged in vendor details localStorage se
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentVendorId = currentUser ? currentUser._id : null;

  // Products fetch karne ka useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:3000/api/v1/property/get-product",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let allProducts: Product[] = response.data.data;

        // Sirf current vendor ke products filter karein
        if (currentVendorId) {
          allProducts = allProducts.filter(
            (product) => product.vendorId === currentVendorId
          );
        }

        setProducts(allProducts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Products fetch karne main masla hua.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentVendorId]);

  // Modal ko open karne ka function, jisme selected product ki details set hoti hain
  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      location: product.location,
      type: product.type,
      price: product.price.toString(), // number ko string mein convert karain
      availableDates: product.availableDates.join(", "), // array ko comma separated string
    });
    setIsModalOpen(true);
  };

  // Modal ko close karne ka function
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Modal form input change handle karne ka function
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update product ko backend pe bhejne ka function
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:3000/api/v1/property/edit-product/${selectedProduct._id}`,
        {
          name: formData.name,
          description: formData.description,
          location: formData.location,
          type: formData.type,
          price: Number(formData.price), // price ko number mein convert karein
          availableDates: formData.availableDates
            .split(",")
            .map((date) => date.trim()), // comma separated string ko array banayein
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully");

        // Update UI: updated product se product list ko update karein
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === selectedProduct._id ? response.data.data : p
          )
        );
        closeModal();
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>

      {/* Agar koi product na ho */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Koi product nahi mila.</p>
      ) : (
        // Grid layout for products
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* Product image */}
              <img
                src={product.pics[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Product details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 mb-1">
                  <strong>Price:</strong> {product.price}
                </p>
                <p className="text-gray-800 mb-1">{product.type}</p>
                <p className="text-gray-800 mb-1">{product.location}</p>

                {/* Edit button jo modal open karega */}
                <button
                  onClick={() => openEditModal(product)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for editing product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="farm house">Farm House</option>
                  <option value="hall">Hall</option>
                  <option value="banquet">Banquet</option>
                  <option value="villas">Villas</option>
                  <option value="murqee">Murqee</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">
                  Available Dates (comma separated)
                </label>
                <input
                  type="text"
                  name="availableDates"
                  value={formData.availableDates}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking_Detail;
