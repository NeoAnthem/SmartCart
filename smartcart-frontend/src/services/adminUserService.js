import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/admin/users`;

export const getAllUsers =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

export const deleteUser =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    await axios.delete(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
  };

  export const updateUserRole =
  async (id, role) => {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `${API_URL}/${id}/role?role=${role}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
};