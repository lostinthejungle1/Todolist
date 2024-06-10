const API_BASE_URL = 'http://localhost:5001/api'; // Adjust according to your actual API URL

export const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            return data.user;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            return data.user;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    const token = localStorage.getItem('token');
    try {
        await fetch(`${API_BASE_URL}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error:', error);
    }
};
