import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/wishlist`;

export const addToWishlist =
  async (productId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        {
          productId
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};

export const getWishlist =
  async () => {

    const token =
      localStorage.getItem("token");

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

export const removeWishlistItem =
  async (wishlistId) => {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/${wishlistId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
};