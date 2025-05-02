import axios from "axios";
import { add_Vendor_Types } from "../Types/Vendor_types";
export const add_Vendor = async (vendorData: add_Vendor_Types) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/vendor/add-vendor`,
      vendorData
    );
    return response;
  } catch (error) {
    console.log("Add Vendor Error", error);
  }
};
