import axios from "axios";

const API_URL =
  "http://localhost:8080/api/reviews";

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