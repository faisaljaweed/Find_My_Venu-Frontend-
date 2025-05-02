import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Components/Loader";

// Product interface define karte hain
interface Product {
  _id: string;
  name: string;
  description: string;
  pics: string[];
  location: string;
  type: string;
  price: number;
  seatedCapacity: string;
  standingCapacity: string;
  size: string;
  vendorId: string;
}

const Booking_Detail: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Modal state aur selected product state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Function to open the image in full screen
  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageOpen(true);
  };

  // Function to close the image
  const closeImage = () => {
    setIsImageOpen(false);
    setSelectedImage("");
  };

  // Form data state for editing product
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "",
    price: "",
    seatedCapacity: "",
    standingCapacity: "",
    size: "",
    pics: [] as string[],
  });

  // Logged in vendor details localStorage se
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const currentVendorId = currentUser ? currentUser._id : null;

  // Products fetch karne ka useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://venu-backend.vercel.app/api/v1/property/get-product",
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
        setError("Product fetch Error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentVendorId]);

  const handleEditImage = async (index: number) => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && selectedProduct) {
        try {
          // Upload the image file
          const form = new FormData();
          form.append("image", file);

          const token = localStorage.getItem("accessToken");
          const uploadResponse = await axios.post(
            `https://venu-backend.vercel.app/api/v1/upload`, // Your image upload endpoint
            form,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Get the new image URL from response
          const newImageUrl = uploadResponse.data.url;

          // Update the pics array
          const updatedPics = [...formData.pics];
          updatedPics[index] = newImageUrl;

          // Update both state and formData
          setSelectedProduct((prev) => ({
            ...prev!,
            pics: updatedPics,
          }));

          setFormData((prev) => ({
            ...prev,
            pics: updatedPics,
          }));
        } catch (err) {
          console.error("Error uploading image:", err);
        }
      }
    };

    input.click();
  };

  // Modal ko open karne ka function, jisme selected product ki details set hoti hain
  // const openEditModal = (product: Product) => {
  //   setSelectedProduct(product);
  //   setFormData({
  //     name: product.name,
  //     description: product.description,
  //     location: product.location,
  //     type: product.type,
  //     price: product.price.toString(),
  //     seatedCapacity: product.seatedCapacity,
  //     standingCapacity: product.standingCapacity,
  //     size: product.size,
  //     pics: product.pics,
  //   });
  //   setIsModalOpen(true);
  // };

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
        `https://venu-backend.vercel.app/api/v1/property/edit-product/${selectedProduct._id}`,
        {
          name: formData.name,
          description: formData.description,
          location: formData.location,
          type: formData.type,
          price: Number(formData.price),
          seatedCapacity: Number(formData.seatedCapacity),
          standingCapacity: Number(formData.standingCapacity),
          size: Number(formData.size),
          pics: formData.pics,
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

  // "See More" aur "See Less" ke liye state aur function
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      {/* Agar koi product na ho */}
      {loading && (
        <div className="z-20 fixed w-screen h-screen flex items-center justify-center bg-black/75">
          <Loader />
        </div>
      )}

      <div
        className={`grid ${
          products.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        } gap-6`}
      >
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
              onClick={() => openImage(product.pics[0])}
            />

            <div className="grid grid-cols-3 gap-4 mb-6 mt-3">
              {product.pics.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => openImage(image)}
                />
              ))}
            </div>
            {/* Product details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">
                {expandedDescriptions[product._id]
                  ? product.description
                  : `${product.description.substring(0, 100)}...`}
                {product.description.length > 100 && (
                  <button
                    onClick={() => toggleDescription(product._id)}
                    className="text-blue-500 ml-2"
                  >
                    {expandedDescriptions[product._id]
                      ? "See Less"
                      : "See More"}
                  </button>
                )}
              </p>
              <p className="text-gray-800 mb-1">
                <strong>Price:</strong> {product.price}
              </p>
              <p className="text-gray-800 mb-1">{product.type}</p>
              <p className="text-gray-800 mb-1">{product.location}</p>
              <p className="text-gray-800 mb-1">{product.size}</p>
              <p className="text-gray-800 mb-1">{product.seatedCapacity}</p>
              <p className="text-gray-800 mb-1">{product.standingCapacity}</p>

              {/* Edit button jo modal open karega */}
              {/* <button
                  onClick={() => openEditModal(product)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Edit
                </button> */}
            </div>
          </div>
        ))}
      </div>
      {/* Modal for editing product */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              {/* Images Section */}
              <div className="mb-4">
                <label className="block mb-2">Product Images</label>
                <div className="flex flex-wrap gap-3">
                  {" "}
                  {/* Flexbox for row layout */}
                  {selectedProduct?.pics.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-md overflow-hidden" // Container for image and edit icon
                    >
                      {/* Image */}
                      <img
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Edit Icon */}
                      <button
                        type="button"
                        onClick={() => handleEditImage(index)} // Function to handle image edit
                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-blue-500 hover:text-blue-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Form Fields */}
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
                <label className="block mb-1">Standing Capacity</label>
                <input
                  type="number"
                  name="standingCapacity"
                  value={formData.standingCapacity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Seated Capacity</label>
                <input
                  type="number"
                  name="seatedCapacity"
                  value={formData.seatedCapacity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Size</label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
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
      {isImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <img
            src={selectedImage}
            alt="Full Screen"
            className="max-w-full max-h-full"
          />
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-4xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking_Detail;
