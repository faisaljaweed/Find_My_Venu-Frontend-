// import { useState } from "react";
// import { addProduct } from "../../Components/api/Product_Api";
// import Input from "../../Components/Input";

// const Add_Product = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [location, setLocation] = useState("");
//   const [price, setPrice] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [pics, setPics] = useState<File | null>(null);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     if (pics) {
//       const productData = {
//         name,
//         description,
//         location,
//         price,
//         date,
//         pics,
//       };
//       addProduct(productData)
//         ?.then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     } else {
//       console.log("Product picture is required");
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_name"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Name
//             </label>
//             <Input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Product Name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_description"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Description
//             </label>
//             <Input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Product Description"
//               value={description}
//               onChange={(e) => {
//                 setDescription(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_price"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Address
//             </label>
//             <Input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Product Address"
//               value={location}
//               onChange={(e) => {
//                 setLocation(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_quantity"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Price
//             </label>
//             <Input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Product Price"
//               value={price}
//               onChange={(e) => {
//                 setPrice(e.target.value);
//               }}
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_quantity"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Dates
//             </label>
//             <Input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Product Dates"
//               value={date.toISOString().substring(0, 10)}
//               onChange={(e) => {
//                 setDate(new Date(e.target.value));
//               }}
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <label
//               htmlFor="product_quantity"
//               className="block text-gray-700 font-medium mb-2 mr-4"
//             >
//               Product Picture
//             </label>
//             <input
//               className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="file"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setPics(e.target.files[0]);
//                 }
//               }}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add_Product;
import { useState } from "react";
import { addProduct } from "../../Components/api/Product_Api";
import Input from "../../Components/Input";

const Add_Product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [pics, setPics] = useState<File[]>([]); // Changed to an array of files

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
    if (pics.length > 0) {
      const productData = {
        name,
        description,
        location,
        price,
        date,
        pics, // Sending multiple files
      };
      addProduct(productData)
        ?.then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      console.log("At least one product picture is required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium mb-2 mr-4">
              Product Name
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium mb-2 mr-4">
              Product Description
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium mb-2 mr-4">
              Product Address
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Product Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium mb-2 mr-4">
              Product Price
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-medium mb-2 mr-4">
              Product Dates
            </label>
            <Input
              className="w-full px-4 py-2 border rounded-md"
              type="date"
              value={date.toISOString().substring(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
          </div>

          {/* Multiple File Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Product Pictures (Max: 8)
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md"
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
