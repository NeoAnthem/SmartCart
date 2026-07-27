    import axios from "axios";

    const API_URL =
    "http://localhost:8080/api/categories";

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