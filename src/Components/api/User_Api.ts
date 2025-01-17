import axios from "axios";
import { Login_Types, Signup_Types } from "../Types/User_types";

export const Login_api = async (userData: Login_Types) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      userData
    );
    return response;
  } catch (error) {
    console.log("Login Credential Error", error);
  }
};

export const Signup_api = async (userData: Signup_Types) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      userData
    );
    return response;
  } catch (error) {
    console.log("Signup Credential Error", error);
  }
};

export const LogOut_api = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("No Access Token Found");
    }
    const response = axios.post(
      "http://localhost:3000/api/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Logout Token", error);
  }
};
