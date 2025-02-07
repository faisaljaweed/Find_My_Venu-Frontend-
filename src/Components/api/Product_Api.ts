import axios from "axios";
import { AddProduct } from "../Types/Product_types";
export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/property/get-product`
    );
    return response.data;
  } catch (error) {
    console.log("Error in get All Product", error);
    return [];
  }
};

export const getDetailProduct = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/property/get-product/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error in get Detail Product", error);
  }
};

export const addProduct = (productData: AddProduct) => {
  try {
    const response = axios.post(
      "http://localhost:3000/api/v1/property/add-product",
      productData
    );
    return response;
  } catch (error) {
    console.log("Error in Add Product", error);
  }
};
