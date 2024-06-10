import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchUserData, loginUser as loginService, logoutUser as logoutService, registerUser as registerService } from '../services/AuthService';
import { TaskContext } from './TaskContext';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const { fetchTasks } = useContext(TaskContext); // Import fetchTasks from TaskContext

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await fetchUserData();
                    setUser(userData);
                    await fetchTasks();
                }
            } catch (error) {
                console.log('Error initializing user:', error);
            }
        };

        initializeUser();
    },[]);

    const login = async (credentials) => {
        const userData = await loginService(credentials);
        setUser(userData);
        await fetchTasks();
    };

    const register = async (credentials) => {
        const userData = await registerService(credentials);
        setUser(userData);
    };

    const logout = () => {
        logoutService();
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
}
