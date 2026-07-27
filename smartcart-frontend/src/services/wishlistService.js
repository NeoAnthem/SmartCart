import axios from "axios";

const API_URL =
  "http://localhost:8080/api/wishlist";

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