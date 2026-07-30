import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/products`;

export const addToCart =
  async (productId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        API_URL,
        {
          productId,
          quantity: 1
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

    export const getCart = async () => {

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

export const removeCartItem =
  async (cartId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    await axios.delete(
      `${API_URL}/${cartId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
    };

    export const updateCartQuantity =
  async (cartId, quantity) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_BASE_URL}/api/cart/${cartId}?quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

  export const validateCoupon =
  async (code) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_BASE_URL}/api/coupons/validate/${code}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
};