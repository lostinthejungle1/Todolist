// src/utils/authUtils.js

/**
 * Retrieves the authentication token from local storage.
 * @returns {string} The retrieved token or null if none is found.
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

