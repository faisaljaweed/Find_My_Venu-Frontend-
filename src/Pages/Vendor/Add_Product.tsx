import { useState } from "react";
import { addProduct } from "../../Components/api/Product_Api";
import Input from "../../Components/Input";
import { toast } from "react-toastify";
// import { set } from "react-datepicker/dist/date_utils";

const Add_Product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  // const [date, setDate] = useState(new Date());
  const [pics, setPics] = useState<File[]>([]); // Changed to an array of files
  const [standingCapacity, setStandingCapacity] = useState(0);
  const [seatedCapacity, setSeatedCapacity] = useState(0);
  const [size, setSize] = useState("");
  const [features, setFeatures] = useState({
    swimmingPool: false,
    parking: false,
    wifi: false,
    security: false,
    kitchen: false,
    bbqArea: false,
    airConditioning: false,
  });
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 8) {
        alert("You can only upload a maximum of 8 files.");
        return;
      }
      setPics(selectedFiles);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setPrice("");
    setType("");
    setLocation("");
    // setDate(new Date());
    setFeatures({
      swimmingPool: false,
      parking: false,
      wifi: false,
      security: false,
      kitchen: false,
      bbqArea: false,
      airConditioning: false,
    });
    if (pics.length > 0) {
      const formData = new FormData(); // Create FormData object
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("type", type);
      // formData.append("date", date.toISOString());
      formData.append("standingCapacity", standingCapacity.toString());
      formData.append("seatedCapacity", seatedCapacity.toString());
      formData.append("size", size);
      formData.append("features", JSON.stringify(features));
      pics.forEach((file) => {
        formData.append("pics", file); // Append each file to FormData
      });
      addProduct(formData)
        ?.then((res) => {
          console.log(res);
          toast.success("Product added successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to add product");
        });
    } else {
      console.log("At least one product picture is required");
    }
  };
  // Remove an image from the selected files
  const handleRemoveImage = (index: number) => {
    const updatedPics = pics.filter((_, i) => i !== index);
    setPics(updatedPics);
  };

  // Open image in full screen
  const handleImageClick = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <Input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Description
              </label>
              <Input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Address
              </label>
              <Input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="Product Address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Price
              </label>
              <Input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Type
              </label>

              <select
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Product Type
                </option>
                <option value="farm house">Farm House</option>
                <option value="hall">Hall</option>
                <option value="banquet">Banquet</option>
                <option value="villas">Villas</option>
                <option value="murqee">Murqee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Product Pictures (Max: 8)
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {pics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {" "}
                  {/* Flexbox for row layout */}
                  {pics.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-md overflow-hidden" // Container for image and cross button
                    >
                      {/* Image */}
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() =>
                          handleImageClick(URL.createObjectURL(file))
                        }
                      />
                      {/* Cross Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1  rounded-full p-1 text-red-500 hover:text-red-700"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Product Pictures (Max: 8)
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {pics.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {pics.length} file(s) selected
                </p>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Standing Capacity
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                value={standingCapacity}
                onChange={(e) => setStandingCapacity(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seated Capacity
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                value={seatedCapacity}
                onChange={(e) => setSeatedCapacity(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Swimming Pool */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="swimmingPool"
                    checked={features.swimmingPool}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Swimming Pool</span>
                </label>

                {/* Parking */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="parking"
                    checked={features.parking}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Parking</span>
                </label>

                {/* WiFi */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="wifi"
                    checked={features.wifi}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">WiFi</span>
                </label>

                {/* Security */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="security"
                    checked={features.security}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Security</span>
                </label>

                {/* Kitchen */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="kitchen"
                    checked={features.kitchen}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Kitchen</span>
                </label>

                {/* BBQ Area */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="bbqArea"
                    checked={features.bbqArea}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">BBQ Area</span>
                </label>

                {/* Air Conditioning */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="airConditioning"
                    checked={features.airConditioning}
                    onChange={handleFeatureChange}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="text-sm">Air Conditioning</span>
                </label>
              </div>
            </div>
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
