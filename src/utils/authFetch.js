export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("adminToken");

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers
        }
    });

    if (response.status === 403) {
        localStorage.removeItem("adminToken");
        window.location.href = "/login";
        return;
    }

    return response;
};