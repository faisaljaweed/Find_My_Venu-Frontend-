export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  type: string;
  available: boolean;
  pics: string[];
};

export type AddProduct = {
  name: String;
  description: String;
  location: String;
  type?: String;
  price: String;
  date: Date;
  pics: File[];
};
