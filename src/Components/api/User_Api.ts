import axios, { AxiosResponse } from "axios";
import { Login_Types, Signup_Types, User } from "../Types/User_types";

export const Login_api = async (userData: Login_Types) => {
  try {
    const response = await axios.post(
      "https://venu-backend.vercel.app/api/v1/user/login",
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
      "https://venu-backend.vercel.app/api/v1/user/signup",
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
      "https://venu-backend.vercel.app/api/v1/user/logout",
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

export const verifyEmailApi = async (emailToken: string) => {
  try {
    const response = await axios.post(
      `https://venu-backend.vercel.app/api/v1/user/verify-email/${emailToken}`
    );
    return response;
  } catch (error) {
    console.log("Verify Email Error", error);
  }
};

export const forgotPasswordApi = async (email: string) => {
  try {
    const response = await axios.post(
      `https://venu-backend.vercel.app/api/v1/user/forgot-password`,
      { email }
    );
    return response;
  } catch (error) {
    console.log("Forgot Password Error", error);
  }
};

export const resetPasswordApi = async (
  newPassword: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(
      `https://venu-backend.vercel.app/api/v1/user/reset-password/`,
      {
        newPassword,
        confirmPassword,
      }
    );
    return response;
  } catch (error) {
    console.log("Reset Password Error", error);
  }
};

// User_Api.ts

// Get User API function
export const getUser = async (): Promise<AxiosResponse<{ data: User[] }>> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `https://venu-backend.vercel.app/api/v1/user/get-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Something went wrong", error);
    throw error;
  }
};

// Delete User API function
export const DeleteUser = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(
      `https://venu-backend.vercel.app/api/v1/user/delete-user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.log("Delete API Error", error);
    throw error;
  }
};
