import React from "react";

const Add_Product = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="product_name"
              className="block text-gray-700 font-medium mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="product_description"
              className="block text-gray-700 font-medium mb-2"
            >
              Product Description
            </label>
            <input
              type="text"
              id="product_description"
              name="product_description"
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="product_price"
              className="block text-gray-700 font-medium mb-2"
            >
              Product Price
            </label>
            <input
              type="text"
              id="product_price"
              name="product_price"
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="product_quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Product Quantity
            </label>
            <input
              type="text"
              id="product_quantity"
              name="product_quantity"
              required
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Product;
