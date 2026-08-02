export function optimizeCloudinaryImage(url, width = 800) {
    if (!url || !url.includes("res.cloudinary.com")) {
        return url;
    }

    // Already transformed
    if (url.includes("/upload/f_")) {
        return url;
    }

    return url.replace(
        "/upload/",
        `/upload/f_auto,q_auto,w_${width},c_limit/`
    );
}