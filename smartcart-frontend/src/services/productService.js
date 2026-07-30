import axios from "axios";
import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/products`;

export const createProduct =
async (product) => {

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await axios.post(

            API_URL,

            product,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const getProducts =
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

export const searchProducts =
  async (keyword) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(
        `${API_URL}/search?keyword=${keyword}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

  export const deleteProduct =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.delete(

        `${API_BASE_URL}/api/products/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

export const getProductById =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(

        `${API_BASE_URL}/api/products/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

    return response.data;
  };

  export const updateProduct =
  async (id, product) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(

        `${API_BASE_URL}/api/products/${id}`,

        product,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    return response.data;
  };

  export const uploadImage =
async (file) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(

      `${API_BASE_URL}/api/products/upload`,

      formData,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,

          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return response.data;
};

export const getLowStockProducts = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/api/products/low-stock`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
};