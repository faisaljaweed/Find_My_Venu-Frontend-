import axios from "axios";

export const signupClient = async () => {
  try {
    const res = await axios.get("");
    return res;
  } catch (error) {
    console.log("", error);
  }
};
