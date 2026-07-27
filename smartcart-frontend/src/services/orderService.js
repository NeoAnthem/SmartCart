import axios from "axios";

const API_URL =
  "http://localhost:8080/api/orders";

export const checkout =
  async (couponCode) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        `${API_URL}/checkout?couponCode=${couponCode}`,
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

export const getOrders =
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

  export const cancelOrder =
  async (orderId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `${API_URL}/cancel/${orderId}`,
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

  export const downloadInvoice =
  async (orderId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/invoice/${orderId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          },

          responseType: "blob"
        }
      );

    return response.data;
};