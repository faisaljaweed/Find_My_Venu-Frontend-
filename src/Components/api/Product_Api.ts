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
  // const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/property/get-product/${id}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response;
  } catch (error) {
    console.log("Error in get Detail Product", error);
  }
};

export const addProduct = (productData: AddProduct) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("Token", token);
    const response = axios.post(
      "http://localhost:3000/api/v1/property/add-product",
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in Add Product", error);
  }
};

export const getProductById = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://localhost:3000/api/v1/property/get-product`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};

export const DeleteProduct = async (productId: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
      `http://localhost:3000/api/v1/property/delete-product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error", error);
  }
};
