import { getToken } from '../utils/authUtils';

const API_BASE_URL = 'http://localhost:5001/api'; // Adjust according to your actual API URL

export const fetchTasks = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to fetch tasks');
    } catch (error) {
        console.error('Fetch tasks error:', error);
        throw error;
    }
};

export const addTask = async (taskData) => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData),
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to add task');
    } catch (error) {
        console.error('Add task error:', error);
        throw error;
    }
};

export const updateTask = async (id, taskData) => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData),
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Failed to update task');
    } catch (error) {
        console.error('Update task error:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    const token = getToken();
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            return 'Task deleted successfully';
        }
        throw new Error('Failed to delete task');
    } catch (error) {
        console.error('Delete task error:', error);
        throw error;
    }
};
