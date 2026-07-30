import axios from "axios";
import API_BASE_URL from "./api";

    const API_URL = `${API_BASE_URL}/api/products`;

    export const getCategories =
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

    export const createCategory =
    async (category) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
        API_URL,
        category,
        {
            headers: {
            Authorization:
                `Bearer ${token}`
            }
        }
        );

    return response.data;
    };

    export const deleteCategory =
    async (id) => {

    const token =
        localStorage.getItem("token");

    const response =
        await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
            Authorization:
                `Bearer ${token}`
            }
        }
        );

    return response.data;
    };  