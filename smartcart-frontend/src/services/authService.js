import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/auth`;

export const loginUser = async (email, password) => {

    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;
};

export const registerUser =
async (
  name,
  email,
  password
) => {

  const response =
    await axios.post(

      `${API_URL}/register`,

      {
        name,
        email,
        password
      }

    );

  return response.data;
};