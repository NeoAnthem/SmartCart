import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/products`;

export const processPayment =
  async (orderId) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.post(
        API_URL,
        {
          orderId: orderId,
          paymentMethod: "UPI"
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );orderId

    return response.data;
};