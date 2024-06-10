import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks as fetchTasksService, addTask, updateTask, deleteTask } from '../services/TaskService';
import { getToken } from '../utils/authUtils';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchTasks = async () => {
        try {
            const fetchedTasks = await fetchTasksService();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(getToken()){
            fetchTasks();    
        }
    }, []);

    const addNewTask = async (taskData) => {
        try {
            const newTask = await addTask(taskData);
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateExistingTask = async (id, taskData) => {
        try {
            const updatedTask = await updateTask(id, taskData);
            setTasks(tasks.map(task => task._id === id ? updatedTask : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const toggleTaskCompletion = async (id) => {
        try {
            const taskToToggle = tasks.find(task => task._id === id);
            const updatedTask = await updateTask(id, { isCompleted: !taskToToggle.isCompleted });
            setTasks(tasks.map(task => task._id === id ? updatedTask : task));
        } catch (error) {
            console.error('Error toggling task completion:', error);
        }
    };

    const removeTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, addNewTask, updateExistingTask, removeTask, toggleTaskCompletion, fetchTasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
