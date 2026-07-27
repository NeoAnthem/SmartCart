import axios from "axios";

const API_URL =
  "http://localhost:8080/api/payments";

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