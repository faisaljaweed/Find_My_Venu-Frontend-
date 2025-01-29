import axios from "axios";
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
