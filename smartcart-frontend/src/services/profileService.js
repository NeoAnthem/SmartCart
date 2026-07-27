import axios from "axios";


const API_URL = "http://localhost:8080/api/profile";

const getToken = () => {
    return localStorage.getItem("token");
};

export const updateProfile = async (name, email) => {
    const response = await axios.put(
        API_URL,
        {
            name,
            email
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const changePassword = async (
    currentPassword,
    newPassword
) => {
    const response = await axios.put(
        `${API_URL}/password`,
        {
            currentPassword,
            newPassword
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

export const getProfileStats = async () => {

    const response = await axios.get(
        `${API_URL}/stats`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};