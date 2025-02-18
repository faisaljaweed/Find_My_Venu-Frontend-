import axios from "axios";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  clientId?: {
    username?: string;
  };
  productId?: {
    name?: string;
  };
  bookingDate: string;
  status: string;
}

const Check_Booking_Details = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/booking/get-booking-only-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data); // Assuming the response has a `data` field
        setLoading(false);
      } catch (error) {
        console.error(error);
        // setError("Failed to fetch bookings");
        setLoading(false);
      }
    };
    getBooking();
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`http://localhost:3000/api/v1/booking/delete-booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookings(bookings.filter((booking) => booking._id !== id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Check Booking Details
        </h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.clientId?.username || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.productId?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Check_Booking_Details;

// import React, { useState } from "react";
// import {
//   TowerControl as GameController,
//   School as Pool,
//   Bird,
//   Users,
// } from "lucide-react";

// interface Feature {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   icon: React.ReactNode;
// }

// function Check_Booking_Details() {
//   const features: Feature[] = [
//     {
//       id: "indoor-games",
//       title: "Indoor Games",
//       description:
//         "Marbel Pool Snooker Table & and Dabbu as indoor games for the clients in Rani Empire",
//       image:
//         "https://plus.unsplash.com/premium_photo-1664302012799-8da4258711a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       icon: <GameController className="w-6 h-6" />,
//     },
//     {
//       id: "swimming-pool",
//       title: "Swimming Pool",
//       description:
//         "A Dream Place for Chilling out with Crystal Clear Swimming Pool and Highly developed swimming pools for children and elders.",
//       image:
//         "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
//       icon: <Pool className="w-6 h-6" />,
//     },
//     {
//       id: "international-zoo",
//       title: "International Zoo",
//       description:
//         "The only farmhouse which have International Zoo in Farmhouse. Animals Breeding Deer's, Antelope's, Shetland Ponies and Lama etc.",
//       image:
//         "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=1200",
//       icon: <Bird className="w-6 h-6" />,
//     },
//     {
//       id: "aqua-room",
//       title: "Aqua Room",
//       description:
//         "The only Farm House which have Aqua Room for Clients to get a memorable Click.",
//       image:
//         "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?auto=format&fit=crop&q=80&w=1200",
//       icon: <Users className="w-6 h-6" />,
//     },
//   ];

//   const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-2 gap-8 items-start">
//           {/* Left Side - Feature List */}
//           <div className="space-y-4">
//             {features.map((feature) => (
//               <button
//                 key={feature.id}
//                 onClick={() => setSelectedFeature(feature)}
//                 className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
//                   selectedFeature.id === feature.id
//                     ? "bg-amber-700 text-white"
//                     : "bg-white hover:bg-amber-50"
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`${
//                       selectedFeature.id === feature.id
//                         ? "text-white"
//                         : "text-amber-700"
//                     }`}
//                   >
//                     {feature.icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg">{feature.title}</h3>
//                     <p
//                       className={`text-sm mt-1 ${
//                         selectedFeature.id === feature.id
//                           ? "text-amber-100"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* Right Side - Image Display */}
//           <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
//             <img
//               src={selectedFeature.image}
//               alt={selectedFeature.title}
//               className="w-full h-full object-cover transition-opacity duration-300"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
//               <h2 className="text-white text-2xl font-bold">
//                 {selectedFeature.title}
//               </h2>
//               <p className="text-white/90 mt-2">
//                 {selectedFeature.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Check_Booking_Details;
