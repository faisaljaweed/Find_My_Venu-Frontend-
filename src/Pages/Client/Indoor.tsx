import React, { useState } from "react";
import {
  TowerControl as GameController,
  School as Pool,
  Bird,
  Users,
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

function Indoor() {
  const features: Feature[] = [
    {
      id: "indoor-games",
      title: "Indoor Games",
      description:
        "Marbel Pool Snooker Table & and Dabbu as indoor games for the clients in Rani Empire",
      image:
        "https://plus.unsplash.com/premium_photo-1664302012799-8da4258711a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <GameController className="w-6 h-6" />,
    },
    {
      id: "swimming-pool",
      title: "Swimming Pool",
      description:
        "A Dream Place for Chilling out with Crystal Clear Swimming Pool and Highly developed swimming pools for children and elders.",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
      icon: <Pool className="w-6 h-6" />,
    },
    {
      id: "international-zoo",
      title: "International Zoo",
      description:
        "The only farmhouse which have International Zoo in Farmhouse. Animals Breeding Deer's, Antelope's, Shetland Ponies and Lama etc.",
      image:
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=1200",
      icon: <Bird className="w-6 h-6" />,
    },
    {
      id: "aqua-room",
      title: "Aqua Room",
      description:
        "The only Farm House which have Aqua Room for Clients to get a memorable Click.",
      image:
        "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?auto=format&fit=crop&q=80&w=1200",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState<Feature>(features[0]);

  return (
    <div className=" bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Right Side - Image Display */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <img
              src={selectedFeature.image}
              alt={selectedFeature.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h2 className="text-white text-2xl font-bold">
                {selectedFeature.title}
              </h2>
              <p className="text-white/90 mt-2">
                {selectedFeature.description}
              </p>
            </div>
          </div>
          {/* Left Side - Feature List */}
          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  selectedFeature.id === feature.id
                    ? "bg-amber-700 text-white"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${
                      selectedFeature.id === feature.id
                        ? "text-white"
                        : "text-amber-700"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p
                      className={`text-sm mt-1 ${
                        selectedFeature.id === feature.id
                          ? "text-amber-100"
                          : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Indoor;
