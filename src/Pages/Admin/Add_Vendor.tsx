export const Add_Vendor = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Vendor
          </h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="vendor_name"
                className="block text-gray-700 font-medium mb-2"
              >
                Vendor Name
              </label>
              <input
                type="text"
                id="vendor_name"
                name="vendor_name"
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_email"
                className="block text-gray-700 font-medium mb-2"
              >
                Vendor Email
              </label>
              <input
                type="email"
                id="vendor_email"
                name="vendor_email"
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Vendor Phone
              </label>
              <input
                type="text"
                id="vendor_phone"
                name="vendor_phone"
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendor_address"
                className="block text-gray-700 font-medium mb-2"
              >
                Vendor Address
              </label>
              <input
                type="text"
                id="vendor_address"
                name="vendor_address"
                required
                className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Vendor
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
