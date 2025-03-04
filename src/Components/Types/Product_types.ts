export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  type: string;
  // available: boolean;
  pics: string[];
  standingCapacity: number;
  seatedCapacity: number;
  size: string;
  features: string[];
};

export type AddProduct = FormData;
