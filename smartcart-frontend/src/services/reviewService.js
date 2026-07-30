import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/products`;

export const getReviews =
  async (productId) => {

    const response =
      await axios.get(
        `${API_URL}/${productId}`
      );

    return response.data;
};

export const addReview =
  async (
    productId,
    rating,
    comment
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        API_URL,
        {
          productId,
          rating,
          comment
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