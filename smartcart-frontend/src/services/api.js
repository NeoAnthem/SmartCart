const API_BASE_URL =
    import.meta.env.PROD
        ? "https://smartcart-backend-2muc.onrender.com"
        : "http://localhost:8080";

export default API_BASE_URL;